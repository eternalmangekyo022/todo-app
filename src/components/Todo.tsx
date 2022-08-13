import { Button, Modal, Stack } from "@mantine/core";
import React, { useState } from "react";
import { TodoProps } from "../types/Todo.js";

function Todo({ dispatch, id, complete, text }: TodoProps): JSX.Element {
    const [active, setActive] = useState<boolean>(false);
    const wrapper: (val: boolean) => (() => void) = (val: boolean): (() => void) => { return () => { setActive(val) } }


    return <>
        <div key={id}>
        <Button
            variant={complete ? 'filled' : 'gradient'}
            color={complete ? 'green' : 'red'}
            style={{ margin: '1rem', minHeight: '3rem', maxHeight: '6rem', maxWidth: '12rem' }}
            onClick={wrapper(true)}
        >
            {/* minus icon here? */}{text.length > 12 ? text.slice(0, 12) + '...' : text}{/* check icon here? */}
        </Button>
        <Modal centered withCloseButton={true} opened={active} onClose={wrapper(false)} >
            <Stack align='center' justify='space-around'>
                <>
                    <Button onClick={() => {dispatch({ type: 'remove', id: id }); setActive(false)}}>Delete</Button>
                    <Button
                        onClick={() => dispatch({ type: 'update', id: id, complete: !complete })}
                    >{complete ? "Not complete" : "Complete task"}</Button>
                </>
            </Stack>
        </Modal>
        </div>
    </>;
}

export default React.memo(Todo)