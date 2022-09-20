import { useState } from 'react';
import { useSubscription, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { QUESTION_DETAIL_SUBSCRIPTION, NEW_VOTE_MUTATION } from './queries';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import styles from './styles.module.css';

function Detail() {
  const { questionId } = useParams();
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isVoted, setIsVoted] = useState(false);

  const { loading, error, data } = useSubscription(QUESTION_DETAIL_SUBSCRIPTION, {
    variables: { questionId },
  });

  const [newVote, { loading: voteLoading, error: voteError }] = useMutation(NEW_VOTE_MUTATION, {
    onCompleted: () => setIsVoted(true),
  });

  const handleVoteBtn = () => {
    newVote({
      variables: {
        input: {
          option_id: selectedOptionId,
        },
      },
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  if (voteError) {
    return <Error message={voteError.message} />;
  }

  const {
    questions_by_pk: { options, title },
  } = data;

  const totalVote = options.reduce(
    (total, value) => total + value.votes_aggregate.aggregate.count,
    0
  );

  return (
    <div>
      <h2>{title}</h2>

      {options.map((option, index) => (
        <div key={index}>
          <label className={styles.optionTitle} htmlFor={index} key={index}>
            <input
              type='radio'
              name='selected'
              id={index}
              value={option.id}
              onChange={({ target }) => setSelectedOptionId(target.value)}
            />
            <span>{option.title}</span>
            {isVoted && (
              <span className={styles.voteCount}>
                (%
                {(
                  (option.votes_aggregate.aggregate.count * 100) /
                  (totalVote === 0 ? 1 : totalVote)
                ).toFixed(2)}
                )
              </span>
            )}
          </label>

          {isVoted && (
            <div>
              <progress
                className={styles.progressBar}
                value={option.votes_aggregate.aggregate.count}
                max={totalVote}
              />
            </div>
          )}
        </div>
      ))}

      {!isVoted && (
        <button disabled={voteLoading} className={styles.voteBtn} onClick={handleVoteBtn}>
          Vote
        </button>
      )}
    </div>
  );
}

export default Detail;
