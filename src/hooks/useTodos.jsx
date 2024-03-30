import { useQuery } from '@tanstack/react-query';
import TodoService from '../services/todo.services';

export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: () => TodoService.getAll(),
    select: ({ data }) => data,
    // кол-во мили секунд
    // scaleTime - свежие данные (значит мы их можем использовать)
    scaleTime: 10,
    // cacheTime - удаление данных с кеша, через определённый промежуток времени
    cacheTime: 10,
  });

  //   // для одной тудушки
  //   const todoId = 1;

  //   return useQuery({
  //     queryKey: ['todos', todoId],
  //     queryFn: () => TodoService.getById(todoId),
  //     select: ({ data }) => data,

  //     // в enabled опрокидывается id пользователя (!!переводим в boolean), и загрузка начинается, когда id получаем
  //     enabled: !!todoId,
  //   });
};
