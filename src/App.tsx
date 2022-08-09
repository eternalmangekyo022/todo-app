import './App.css';
import React, { useRef, useState, useReducer } from 'react';
import { TodoProps, TodoAction, Todo as Todos } from './types.js'


import { Container, Center, Stack, Button, TextInput as Input, ScrollArea, Space, Modal } from '@mantine/core';
import { IconPencil, /* IconCircleMinus */ } from '@tabler/icons';
import { faker } from '@faker-js/faker';


const uuid = (from: string=""): number => {
  const val: number = parseInt((Math.random() * 1000).toString().split(".")[0])
  if(from !== "fake()") console.log(`${val}${from ? ", called from " + from : ""}`)
  return val
}
const fake = (): Todos => ({ complete: false, id: uuid("fake()"), text: faker.animal.cat() })

export default function App() {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [scrollArea, setScrollArea] = useObject<{ height: string, width: string; }>({ height: "40%", width: "20rem" });
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
    dispatch({ type: "add", content: { complete: false, id: uuid("submit"), text: input } })
    /* todosHandler.append({ text: input, complete: false }); */
    setInput("");
  };
  
  const Todo: React.FC<TodoProps> = ({ dispatch, id, complete, text }): JSX.Element => {
    /* const [complete, setComplete] = useState<boolean>(false); */

    const [active, setActive] = useState<boolean>(false);
    const wrapper: (val: boolean) => (() => void) = (val: boolean): (() => void) => { return () => { setActive(val) } }
    // const untoggled: React.CSSProperties = { minHeight: '3rem', maxHeight: '6rem', maxWidth: '12rem' };
    // const toggledState: React.CSSProperties = { height: '100%', width: '100%', position: 'absolute', zIndex: 1 };

    // const [style, toggleStyle] = useToggleObject<React.CSSProperties, React.CSSProperties>([untoggled, toggledState]);

    return <>
      <div key={id}>
        <Button
          variant={complete ? 'filled' : 'gradient'}
          color={complete ? 'green' : 'red'}
          style={{ margin: '1rem', minHeight: '3rem', maxHeight: '6rem', maxWidth: '12rem' }}
          onClick={wrapper(true)}
        >
          {/* minus icon here */}{text.length > 12 ? text.slice(0, 12) + '...' : text}{/* check icon here */}
        </Button>
        <Modal centered withCloseButton={true} opened={active} onClose={wrapper(false)}>
            { active ?
            <>

                <Button onClick={() => dispatch({ type: 'remove', id: id })}>Delete</Button>
                <Button
                  onClick={() => dispatch({ type: 'update', id: id, complete: !complete })}
                >{complete ? "Not complete" : "Complete task"}</Button>

            </> : <>
              
              </>

            }
          <Stack justify="center">
          </Stack>
        </Modal>
      </div>
    </>;
  }

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
              <div>
                {todos.map(i => <>
                  <Todo dispatch={dispatch} id={i.id} complete={i.complete} text={i.text}/>
                </>)}
              </div>
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