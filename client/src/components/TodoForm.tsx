/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Container, Field, Flex, Input, Spinner, defineStyle } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { BASE_URL } from "../App";

const TodoForm = () => {
	const [newTodo, setNewTodo] = useState("");

	const queryClient = useQueryClient();

	const { mutate: createTodo, isPending: isCreating } = useMutation({
		mutationKey: ["createTodo"],
		mutationFn: async (e: React.FormEvent) => {
			e.preventDefault();
			try {
				const res = await fetch(BASE_URL + `/todos`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ body: newTodo }),
				});
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}

				setNewTodo("");
				return data;
			} catch (error: any) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
		onError: (error: any) => {
			alert(error.message);
		},
	});

	return (
		<Container maxW={"900px"}>
		<form onSubmit={createTodo}>
			<Flex gap={2}>
<Field.Root>
      <Box pos="relative" w="full">
        <Input className="peer" placeholder="" type='text'
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					ref={(input) => input && input.focus()}/>
        <Field.Label css={floatingStyles}>Enter new GoDo</Field.Label>
      </Box>
    </Field.Root>
				<Button
					mx={2}
					type='submit'
					_active={{
						transform: "scale(.97)",
					}}
				>
					{isCreating ? <Spinner size={"xs"} /> : <IoMdAdd size={30} />}
				</Button>
			</Flex>
		</form>
		</Container>
	);
};
export default TodoForm;

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "fg.muted",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "fg",
    top: "-3",
    insetStart: "2",
  },
})
