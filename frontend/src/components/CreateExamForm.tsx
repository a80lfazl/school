import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

import { createExam } from "../api";

export const CreateExamForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    // date: Date.now(),
  });

  const [, setLocation] = useLocation();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-exams"] });
      setLocation("/exam");
    },
  });

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // setFormData({
    //   ...formData,
    //   date: Date.now(),
    // });

    mutation.mutate({
      ...formData,
      subjectId: "6735e9725ea18b77191204e0",
    });
  };

  const handleChange = (e: {
    target: {
      name: string;
      value: string | number;
    };
  }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Create a exam</h1>
      <input
        value={formData.title}
        onChange={handleChange}
        required
        type="text"
        name="title"
        id="title"
      />
      <button type="submit">create</button>
    </form>
  );
};
