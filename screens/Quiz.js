import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';

const Quiz = ({navigation}) => {
  const [question, setQuestion] = useState([]);
  const [questionNo, setQuestionNo] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [isScoreGiven, setIsScoreGiven] = useState(false);
  const [currentOption, setCurrentOption] = useState(null);

  const getQuestion = async () => {
    const URL =
      'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple&encode=url3986';
    const response = await fetch(URL);
    const data = await response.json();
    setQuestion(data.results);
    setOptions(generateOptionsAndShuffle(data.results[0]));
  };

  useEffect(() => {
    getQuestion();
  }, []);

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const generateOptionsAndShuffle = _question => {
    const allOptions = [..._question.incorrect_answers];
    allOptions.push(_question.correct_answer);
    shuffleArray(allOptions);
    return allOptions;
  };

  const handlSelectedOption = _option => {
    setIsOptionSelected(true);
    setCurrentOption(_option);
    if (_option === question[questionNo].correct_answer) {
      setScore(score + 10);
      setIsScoreGiven(true);
    }
  };

  const handleShowResult = () => {
    navigation.navigate('Result', {
      score: score,
    });
  };

  const handleSkip = () => {
      // if(isScoreGiven) {
      //   setIsScoreGiven(false);
      //   if(score > 0) {
      //       setScore(score - 10);
      //   }
      // }

      if(questionNo < 9) {
        setQuestionNo(questionNo + 1);
        setOptions(generateOptionsAndShuffle(question[questionNo + 1]))
        setIsOptionSelected(false)
      }
  };

  const handleNext = () => {
    if (isOptionSelected) {
      setIsOptionSelected(false);
      if (questionNo < 9) {
        setQuestionNo(questionNo + 1);
        setOptions(generateOptionsAndShuffle(question[questionNo + 1]));
      }
    } else {
      Alert.alert('Attension', 'Please First Select An Option Or Press Skip', [
        {text: 'OK', onPress: () => null},
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {question.length > 0 ? (
        <View style={{height: '100%'}}>
          <View style={styles.top}>
            <Text style={styles.questionText}>
              Q.{questionNo + 1}{' '}
              {decodeURIComponent(question[questionNo].question)}{' '}
            </Text>
          </View>

          <View style={styles.options}>
            {options.map(option => (
              <TouchableOpacity
                disabled={isOptionSelected}
                key={Math.random()}
                activeOpacity={0.5}
                style={{
                  backgroundColor: isOptionSelected
                    ? option === question[questionNo].correct_answer
                      ? 'green'
                      : option === currentOption
                      ? 'red'
                      : '#0000cd'
                    : '#0000cd',
                  padding: 12,
                  marginVertical: 7,
                  marginHorizontal: 8,
                  borderRadius: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => handlSelectedOption(option)}>
                <Text style={styles.optionText}>
                  {decodeURIComponent(option)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.bottom}>
            <TouchableOpacity
              disabled={isOptionSelected}
              activeOpacity={0.5}
              style={styles.buttonSkip}
              onPress={() => handleSkip()}>
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
            { questionNo!=9 && (
                <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonNext}
                onPress={() => handleNext()}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            )}

            {questionNo === 9 && (
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.button}
                onPress={() => handleShowResult()}>
                <Text style={styles.buttonText}>Show Result</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.NoQuestionContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={styles.NoQuestionText}>
            Questions Are Loading Please Wait...
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    height: '100%',
  },

  top: {
    marginVertical: 16,
  },

  options: {
    marginVertical: 16,
    flex: 1,
  },

  optionButton: {
    backgroundColor: '#0000cd',
    padding: 12,
    marginVertical: 7,
    marginHorizontal: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },

  questionText: {
    fontSize: 28,
    color: 'black',
    paddingVertical: 14,
    paddingHorizontal: 6,
  },

  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  buttonNext: {
    backgroundColor: '#00bfff',
    paddingVertical: 16,
    borderRadius: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  buttonSkip: {
    backgroundColor: '#b22222',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  buttonText: {
    fontSize: 27,
    fontWeight: '600',
    color: '#fff',
  },
  NoQuestionContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  NoQuestionText: {
    fontSize: 26,
    fontWeight: '700',
    color: 'black',
    lineHeight: 40,
  },
});

export default Quiz;
