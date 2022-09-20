import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_QUESTION_MUTATION } from './queries';
import styles from './styles.module.css';

const initialOptions = [{ title: '' }, { title: '' }];

function NewQuestion() {
  const [addNewQuestion, { loading }] = useMutation(NEW_QUESTION_MUTATION);
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(initialOptions);

  const handleChangeOption = ({ target }) => {
    const newArray = options;
    newArray[target.id].title = target.value;
    setOptions([...newArray]);
  };

  const handleSaveBtn = () => {
    const filledOptions = options.filter((option) => option.title !== '');

    if (title === '' || filledOptions.length < 2) {
      return false;
    }

    addNewQuestion({
      variables: {
        input: {
          title,
          options: {
            data: filledOptions,
          },
        },
      },
    });

    setOptions(initialOptions);
    setTitle('');
  };

  return (
    <div>
      <h2>Questions</h2>
      <input
        placeholder='Type your question...'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        disabled={loading}
        className={styles.questionInput}
      />

      <h2>Options</h2>
      {options.map((option, index) => (
        <div key={index}>
          <input
            placeholder='Type your option...'
            value={option.title}
            id={index}
            onChange={handleChangeOption}
            disabled={loading}
            className={styles.optionInput}
          />
        </div>
      ))}

      <button
        className={styles.button}
        disabled={loading}
        onClick={() => setOptions([...options, { title: '' }])}
      >
        New Option
      </button>

      <button className={styles.button} disabled={loading} onClick={handleSaveBtn}>
        Save
      </button>
    </div>
  );
}

export default NewQuestion;
