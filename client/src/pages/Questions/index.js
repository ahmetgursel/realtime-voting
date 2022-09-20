import { useSubscription } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUESTIONS_SUBSCRIPTION } from './queries';

import Loading from '../../components/Loading';

function Questions() {
  const { loading, data } = useSubscription(QUESTIONS_SUBSCRIPTION);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {data.questions.map((question) => (
        <div key={question.id}>
          <Link to={`/question/${question.id}`}>{question.title}</Link>
        </div>
      ))}
    </div>
  );
}

export default Questions;
