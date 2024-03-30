import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useTodos } from './hooks/useTodos';
import { useState } from 'react';
import TodoService from './services/todo.services';

const App = () => {
  // isLoading - срабатывает когда идёт первый запрос на сервер
  // isFetching - срабатывает когда данные переобновляются
  // refetch - вручную обновляет данные
  const { isLoading, error, data, refetch } = useTodos();

  // для перезаписи кеша
  const queryClient = useQueryClient();

  // useIsFetching - показывает кол-во переобновление данных
  const countFetching = useIsFetching();

  const [title, setTitle] = useState('');

  const { mutate } = useMutation({
    mutationKey: ['create todo'],
    mutationFn: (title) => TodoService.create(title),
    onSuccess: async () => {
      setTitle('');
      alert('Todo created');
      await refetch();
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutate(title);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 20,
      }}
    >
      <div>
        {!!countFetching && <h3>Count fetching: {countFetching}</h3>}
        <h2>Create todo:</h2>
        <div>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Enter todo title"
            />
            <br />
            <br />

            <button>Create</button>
          </form>
        </div>
      </div>
      <div>
        <button onClick={() => queryClient.invalidateQueries(['todos'])}>
          Refresh
        </button>
        <h1>TODOS:</h1>

        {!!data ? (
          data.map((el) => (
            <div key={el.id}>
              <b>{el.id}:</b> {el.title}
            </div>
          ))
        ) : (
          <h1>Data not found!</h1>
        )}
      </div>
    </div>
  );
};

export default App;
