import './App.css';
import React, { useRef, useState, useReducer } from 'react';
import { TodoProps, TodoAction, Todo as Todos } from './types.js'
import Todo from './components/Todo.js'

import { Container, Center, Stack, Button, TextInput as Input, ScrollArea, Space, Modal } from '@mantine/core';
import { IconPencil, /* IconCircleMinus */ } from '@tabler/icons';
import { faker } from '@faker-js/faker';


const uuid = (): number => parseInt((Math.random() * 1000).toString().split(".")[0])
const fake = (): Todos => ({ complete: false, id: uuid(), text: faker.name.findName() })

export default function App() {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");
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
  }, [fake(), fake(), fake()])

  const submit: () => void = (): void => {
    if (!input) {
      setError("Field cannot be empty!");
      return;
    }
    dispatch({ type: "add", content: { complete: false, id: uuid(), text: input } })
    /* todosHandler.append({ text: input, complete: false }); */
    setInput("");
  };
  

  return <>
    <Container fluid style={{ backgroundColor: "rgb(234 255 229)", height: '100vh' }}>
      <Center style={{ width: '100%', height: '100%' }}>
        <Stack /* contains addingTodos & todosListingSection */ spacing={80} justify='center' align='center' style={{ width: '40%', height: '100%' }}>
          <Stack justify='space-around' align='center' style={{ height: '30vh', width: '50%', marginTop: "-20%", backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '10%' }}>
            <Input radius='lg' variant='filled' error={error} icon={<IconPencil></IconPencil>} style={{ width: '80%', marginTop: '10%' }} placeholder='Type todo here...' value={input} onChange={(e: { target: { value: string; }; }) => {
              const _ = e.target.value;
              if (error && _ !== "") setError("");
              setInput(_);
            }}></Input>
            <Button onClick={submit} variant='light' color='green'>Add todo</Button>
          </Stack>
          <ScrollArea type='always' scrollbarSize={4} style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '10%', height: "40%", width: "20rem" }}>
            <Stack spacing='md' justify='space-around' align='center'>
              <Space h='xs' />
                {todos.map(i => <>
                  <Todo dispatch={dispatch} id={i.id} complete={i.complete} text={i.text}/>
                </>)}
              <Space h='xs' />
            </Stack >
          </ScrollArea>
        </Stack>
      </Center>


    </Container>

  </>;
}

function useObject<T>(init: T): [T, (val: T) => void] {
  const [value, setValue] = useState<T>(init);

  const setObject: (val: T) => void = (val: T): void => setValue(prev => ({ ...prev, ...val }))

  return [value, setObject]
}