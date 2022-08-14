import './App.css';
import React, { useState, useReducer, useEffect } from 'react';
import { TodoAction, Todo as Todos } from './types/Todo.js'
import Todo from './components/Todo.js'

import { Container, Center, Stack, Button, TextInput as Input, ScrollArea, Space, Notification } from '@mantine/core';
/* import { IconPencil  } from '@tabler/icons'; */
/* import { faker } from '@faker-js/faker'; */

const uuid = (): number => parseInt((Math.random() * 10000).toString().split(".")[0])
const fake = (): Todos => {
  return { id: uuid(), complete: false, text: uuid().toString() }
}


function App(): JSX.Element {
  const [notify, setNotify] = useState<boolean>(true);
  const [input, setInput] = useState<string>("");
  const [todos, dispatch] = useReducer((state: Todos[], action: TodoAction) => {
    switch(action.type) {
      case "add":
        return [...state, action.content]
      case "remove":
        return state.filter(i => i.id !== action.id)
      case "empty":
        return []
      case "update":
        return state.map(i => i.id === action.id ? { ...i, complete: action.complete } : i)
      default:
        return state
    }
  }, [])


  const submit = (): void => {
    if (!input) {
      /* setError("Field cannot be empty!"); */
      return;
    }
    dispatch({ type: "add", content: { complete: false, id: uuid(), text: input } })
    setInput("");
  };
  
  useEffect(() => {
    const _id = setTimeout(() => setNotify(false), 5000)
    return () => clearTimeout(_id)
  }, [])


  return <>
    <Container fluid style={{ backgroundColor: "rgb(234 255 229)", height: '100vh' }}>
      <Center style={{ width: '100%', height: '100%' }}>
        <Stack /* input section */ spacing={80} justify='center' align='center' style={{ width: '40%', height: '100%' }}>
          <Stack justify='space-around' align='center' style={{ height: '30vh', width: 'clamp(13rem, 60vw, 20rem)', marginTop: "-20%", backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '10%' }}>
            <input className='input-todo' placeholder='Type todo here...' type="text" value={input} onChange={(e: { target: { value: string; }; }) => {
              const _ = e.target.value;
              /* if (error && _ !== "") setError(""); */
              setInput(_); 
            }}/>
            <Button onClick={submit} variant='light' color='green'>Add todo</Button>
          </Stack>
          <ScrollArea type='always' scrollbarSize={6} style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '5%', height: "40%", width: "21rem" }}>
            <Stack spacing='md' justify='space-around' align='center'>
              <Space h='xs' />
                {todos.map(i => <>
                  <Todo dispatch={dispatch} id={i.id} complete={i.complete} text={i.text} last={todos.indexOf(i) === todos.length - 1} />
                </>)}
              <Space h='xs' />
            </Stack >
          </ScrollArea>
        </Stack>
      </Center>
      { notify && <Notification disallowClose color='yellow' style={{ position: 'fixed', bottom: 'clamp(.5rem, 10%, 1rem)', right: '1%', userSelect: 'none' }} title='🚧'>Site under construction</Notification>}

    </Container>
  </>;
}

function useObject<T>(init: T): [T, (val: T) => void] {
  const [value, setValue] = useState<T>(init);

  const setObject: (val: T) => void = (val: T): void => setValue(prev => ({ ...prev, ...val }))

  return [value, setObject] as [T, React.Dispatch<React.SetStateAction<T>>]
}

export default App