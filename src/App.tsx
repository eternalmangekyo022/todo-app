import './App.css';
import React, { useEffect, useState } from 'react';

// import { faker } from '@faker-js/faker'

import { Container, Center, Stack, Button, TextInput as Input, ScrollArea, Space } from '@mantine/core';
import { useListState, /* useToggle */ } from '@mantine/hooks';
import { IconPencil, /* IconCircleMinus */ } from '@tabler/icons';

function useToggleObject<T, U>(initial: [T, U]): [T | U, () => void] {
  const [value, setValue] = useState<T | U>(initial[0]);
  const [used, setUsed] = useState<0 | 1>(0);

  // const toggle: () => void = (): void => setValue({ ...value } === { ...initial[0] } ? { ...initial[1] } : { ...initial[0] })
  const toggle: () => void = (): void => {
    const index = used === 0 ? 1 : 0
    setValue(initial[index])
    setUsed(index)
  }

  return [value, toggle]
}

function useObject<T>(init: T): [T, (val: T) => void] {
  const [value, setValue] = useState<T>(init);

  const setObject: (val: T) => void = (val: T): void => setValue(prev => ({ ...prev, ...val }))
  
  return [value, setObject]
}


interface TodoType {
  complete: boolean;
  text: string,
}

export default function App() {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [scrollArea, setScrollArea] = useObject<{ height: string, width: string }>({ height: "40%", width: "20rem" })
  const [todos, todosHandler] = useListState<TodoType>([
    { text: "First todo", complete: false },
    { text: "Second todo", complete: false },
    { text: "Third todo", complete: true },
    { text: "Fourth todo", complete: false },
  ])

  const ids: number[] = []

  const uuid: () => number = (): number => {
    const ret: number = (ids.at(-1) || 0) + 1
    ids.push(ret)
    return ret
  }

  const clearTodos: () => void = (): void => {
    todosHandler.setState([]);
  };

  const submit: () => void = (): void => {
    if (!input) {
      setError("Field cannot be empty!");
      return;
    }
    todosHandler.append({ text: input, complete: false });
    setInput("");
  };

  const Todo: React.FC<{ text: string, complete: boolean }> = ({ text, complete }): JSX.Element => {
    // const [active, setActive] = useState<boolean>(false);
    const untoggled: React.CSSProperties = { minHeight: '3rem', maxHeight: '6rem', maxWidth: '12rem' }
    const toggledState: typeof untoggled = { height: '100%', width: '100%', position: 'absolute', zIndex: 1 }

    const [style, toggleStyle] = useToggleObject<React.CSSProperties, React.CSSProperties>([untoggled, toggledState])

    return <>
      <Button
        variant={complete ? 'filled' : 'gradient'}
        color={complete ? 'green' : 'red'}
        style={{ margin: '1rem', ...style }}
        onClick={() => {
          toggleStyle()
          
        }}
        key={uuid()}
      >
        {/* minus icon here */}{text.length > 12 ? text.slice(0, 12) + '...' : text}{/* check icon here */}
      </Button>
    </>;
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
          <ScrollArea type='always' scrollbarSize={4} style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '10%', ...scrollArea }}>
            <Stack spacing='md' justify='space-around' align='center' style={{ textAlign: 'center' }}>
              <Space h='xs' />
              {todos.map(i => <>
                <Todo complete={i.complete} text={i.text}/>
              </>)}
              <Space h='xs' />
            </Stack >
          </ScrollArea>
        </Stack>
      </Center>


    </Container>

  </>;
}