import { useEffect, useRef, useState, RefObject } from "react";
import { Question } from "src/types";
import { useModal } from "src/hooks";

const useModalPagination = ({
  questions,
  selectorClass,
  modalRef,
}: {
  questions: Question[];
  selectorClass: string;
  modalRef: RefObject<HTMLDivElement>;
}) => {
  const { isOpen, setIsSuccess } = useModal();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState<Question[][]>([]);
  // Reference to measure question heights
  const questionsContainerRef = useRef<HTMLDivElement>(null);
  const [isCalculatingPages, setIsCalculatingPages] = useState(false);
  const [questionHeights, setQuestionHeights] = useState<number[]>([]);
  const [modalHeight, setModalHeight] = useState<number>(640); // Default height

  // Measure question heights
  useEffect(() => {
    if (!questions.length || !isOpen) {
      setCurrentPage(0);
      return;
    }

    // First, render all questions to measure their heights
    if (!questionHeights.length && !isCalculatingPages) {
      setIsCalculatingPages(true);
    }
  }, [questions, isOpen, questionHeights.length, isCalculatingPages]);

  // Update modal height when it changes
  useEffect(() => {
    if (modalRef.current && isOpen) {
      const height = modalRef.current.clientHeight;
      if (height > 0 && height !== modalHeight) {
        setModalHeight(height);
      }
    }
  }, [isOpen, modalHeight, modalRef]);

  // Calculate question heights after rendering
  useEffect(() => {
    if (!isCalculatingPages || !questionsContainerRef.current) return;

    // Get all question elements
    const questionElements = questionsContainerRef.current.querySelectorAll(
      `.${selectorClass}`
    );
    const heights: number[] = [];

    // Measure each question's height
    questionElements.forEach((element) => {
      heights.push(element.getBoundingClientRect().height);
    });

    setQuestionHeights(heights);
    setIsCalculatingPages(false);
  }, [isCalculatingPages]);

  // Split questions into pages based on measured heights
  useEffect(() => {
    if (!questions.length) return;

    // If we don't have heights yet, use a simple split (this ensures we have pages even before measurement)
    if (!questionHeights.length) {
      const halfwayPoint = Math.ceil(questions.length / 2);
      const pages = [
        questions.slice(0, halfwayPoint),
        questions.slice(halfwayPoint),
      ].filter((page) => page.length > 0);

      setQuestionsPerPage(pages);
      setTotalPages(pages.length);
      return;
    }

    // Maximum content height (modal max height minus header, padding, and button)
    // Use the tracked modal height
    const maxContentHeight = modalHeight - 60 - 64 - 60 - 24; // maxHeight - header - padding - button - gap

    const pages: Question[][] = [];
    let currentPage: Question[] = [];
    let currentHeight = 0;

    // Distribute questions across pages
    questions.forEach((question, index) => {
      const questionHeight = questionHeights[index] || 0;
      // If adding this question would exceed the max height, and we already have at least one question on the page
      if (
        currentHeight + questionHeight > maxContentHeight &&
        currentPage.length > 0
      ) {
        pages.push([...currentPage]);
        currentPage = [question];
        currentHeight = questionHeight + 24;
      } else {
        currentPage.push(question);
        currentHeight += questionHeight + 24;
      }
    });

    // Add the last page if it has questions
    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    setQuestionsPerPage(pages);
    setTotalPages(pages.length);
  }, [questions, questionHeights, modalHeight]);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setIsSuccess(true);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    currentPage,
    handlePrevPage,
    isCalculatingPages,
    questionsContainerRef,
    questionsPerPage,
    totalPages,
    handleNextPage,
  };
};

export default useModalPagination;
