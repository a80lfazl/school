import axios from "axios";

export const getAllExams = async () => {
  const { data } = await axios.get("http://localhost:3000/api/exam");

  return data.exams;
};

export const createExam = async (data) => {
  const response = await axios.post("http://localhost:3000/api/exam", data);

  return response;
};

export const deleteExam = async (examId: string) => {
  const response = await axios.delete(
    `http://localhost:3000/api/exam/${examId}`
  );

  return response;
};
