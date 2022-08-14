import React, { useState } from "react";
import { Button, Modal, Stack, Container, Center, Divider, Text } from "@mantine/core";
import { TodoProps } from "../types/Todo.js";
import { IconTrash, IconX, IconCheck } from '@tabler/icons'


function Todo({ dispatch, id, complete, text, last }: TodoProps): JSX.Element {
    const [active, setActive] = useState<boolean>(false);
    const activeWrapper: (val: boolean) => (() => void) = (val: boolean): (() => void) => { return () => { setActive(val) } };
    const deleteTodo = (): void => dispatch({ type: 'remove', id });

    console.count("Todo render")

    return <>
        <div key={id} style={{ width: '20rem' }}>
            <Stack justify='center' align='center' style={{ flexDirection: 'row', position: 'relative' }}>
{/* 20% */}     <Button style={{ width: '20%', left: '1rem', position: 'absolute' }} onClick={deleteTodo}><IconTrash /></Button>
{/* 60% */}     <Container style={{ width: '60%', display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant={complete ? 'filled' : 'gradient'}
                        color={complete ? 'green' : 'red'}
                        style={{ minHeight: '3rem', maxHeight: '6rem', maxWidth: '65%' }}
                        onClick={() => setActive(true)}
                    >
                        {text.length > 12 ? text.slice(0, 12) + '...' : text}
                    </Button>
                </Container>
{/* 20% */}     <Button color={ complete ? "red" : "green"} style={{ width: '20%', right: '1rem', position: 'absolute' }} onClick={() => dispatch({ type: "update", id, complete: !complete })}>{complete ? <IconX/> : <IconCheck/>}</Button>
            </Stack>
            <Modal style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} centered withCloseButton={false} opened={active} onClose={activeWrapper(false)}>
                <Center>
                    <Text>{text}</Text>
                </Center>
            </Modal>
            {!last && <Divider style={{ marginTop: '10px' }}/>}
        </div>
    </>;
}

export default React.memo(Todo)
