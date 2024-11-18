import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Trash2 } from "lucide-react";
import { getAllExams, deleteExam } from "../api";
import { dateFormater } from "../utils/dateConverter";

import { type Exam } from "../App";
import { Link } from "wouter";

export const ExamList = () => {
  const queryClient = useQueryClient();

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["get-all-exams"],
    queryFn: getAllExams,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-exams"] });
    },
  });

  const handleDeleteExam = async (examId: string) => {
    deleteMutation.mutate(examId);
  };

  return (
    <>
      <h1>Exams</h1>
      {isPending ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <h2>Error: {error.message}</h2>
      ) : (
        <ul>
          {data.length !== 0 ? (
            data.map((exam: Exam) => {
              return (
                <>
                  <li key={exam._id}>
                    {exam.title} <br /> {dateFormater(exam.createdAt)}{" "}
                    <Trash2 onClick={() => handleDeleteExam(exam._id)} />
                  </li>
                  <hr />
                </>
              );
            })
          ) : (
            <>
              <h2>No exams</h2>
              <Link href="/exam/create">Create one</Link>
            </>
          )}
        </ul>
      )}
    </>
  );
};
