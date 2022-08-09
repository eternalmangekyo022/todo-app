import { Button, Modal, Stack } from "@mantine/core";
import { useState } from "react";
import { TodoProps } from "../types.js";

export default function Todo({ dispatch, id, complete, text }: TodoProps): JSX.Element {
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