import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { GET_SUBJECT_BY_ID } from "src/queries/subjectQueries";
import Loader from "components/shared/Loader";

type Props = {
  route: any;
};

type Question = {
  question: string;
  options: string[];
  answer: string;
};

type Subject = {
  id: number;
  name: string;
  questions: Question[];
};

const Quiz = ({ route }: Props) => {
  const { id } = route.params;
  const [open, setOpen] = useState(true);
  const { loading, error, data } = useQuery(GET_SUBJECT_BY_ID, {
    variables: { id: id },
  });

  console.log(data);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [missedQuestions, setMissedQuestions] = useState<number[]>([]);

  const subject: Subject | undefined = data?.subject;

  const handleAnswerButtonClick = async (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    } else {
      await setMissedQuestions([...missedQuestions, currentQuestionIndex]);
    }
    if (currentQuestionIndex === (subject?.questions.length ?? 0) - 1) {
      setShowScore(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  console.log(missedQuestions);
  const handleRestartButtonClick = () => {
    setCurrentQuestionIndex(0);
    setMissedQuestions([]);
    setScore(0);
    setShowScore(false);
  };

  if (loading) {
    return <Loader open={open} setOpen={setOpen} />;
  } else if (data?.subject.questions.length === 0) {
    return (
      <View>
        <Text>No Quiz available for this session</Text>
      </View>
    );
  } else {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {!showScore ? (
            <View className="w-screen h-screen flex-col justify-center items-center">
              <Text style={styles.questionText}>
                {subject?.questions[currentQuestionIndex].question}
              </Text>
              {subject?.questions[currentQuestionIndex].options.map(
                (option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.answerButton}
                    className="w-4/5 "
                    onPress={() =>
                      handleAnswerButtonClick(
                        option ===
                          subject?.questions[currentQuestionIndex].answer
                      )
                    }
                  >
                    <Text className="" style={styles.answerText}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          ) : (
            <>
              <Text style={styles.scoreText}>
                Your score: {score}/{subject?.questions.length}
              </Text>
              <View className="w-screen" style={styles.revisionContainer}>
                {subject?.questions.map((question, index) => (
                  <View
                    key={index}
                    className="w-4/5"
                    style={
                      missedQuestions.includes(index)
                        ? styles.missedQuestion
                        : styles.question
                    }
                  >
                    <Text style={styles.questionText}>{question.question}</Text>
                    <View style={styles.optionsContainer}>
                      {question.options.map((option, optionIndex) => (
                        <View
                          key={optionIndex}
                          style={
                            question.answer === option
                              ? styles.correctOption
                              : currentQuestionIndex === index &&
                                optionIndex ===
                                  question.options.indexOf(question.answer)
                              ? styles.wrongOption
                              : styles.option
                          }
                        >
                          <Text style={styles.optionText}>{option}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                style={styles.restartButton}
                onPress={handleRestartButtonClick}
              >
                <Text style={styles.restartButtonText}>Restart Quiz</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 30,
  },
  answerButton: {
    backgroundColor: "#3498db",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  answerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  scoreText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 30,
  },
  revisionContainer: {
    alignItems: "center",
  },
  question: {
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
  },
  currentQuestion: {
    marginVertical: 10,
    backgroundColor: "#efefef",
    padding: 20,
    borderRadius: 10,
  },
  optionsContainer: {
    marginTop: 10,
  },
  option: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  correctOption: {
    backgroundColor: "#7dd17d",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  wrongOption: {
    backgroundColor: "#f23c3c",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
  },
  restartButton: {
    backgroundColor: "#3498db",
    padding: 15,
    marginTop: 30,
    borderRadius: 10,
  },
  restartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  missedQuestion: {
    marginVertical: 10,
    backgroundColor: "#ffcccc",
    padding: 20,
    borderRadius: 10,
  },
});

export default Quiz;
