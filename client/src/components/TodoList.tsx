import { Container, Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../App";
import TodoItem from "./TodoItem";
import { Alert } from "./ui/alert";
export type Todo = {
	_id: number;
	body: string;
	completed: boolean;
};

const TodoList = () => {
	const { data: todos, isLoading } = useQuery<Todo[]>({
		queryKey: ["todos"],
queryFn: async () => {
  try {
    const res = await fetch(BASE_URL + "/todos");
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }
    return data || [];
  } catch (error) {
    console.log(error);
    return []; // Return an empty array when an error occurs
  }
}
	});

	return (
		<>
			<Container maxW={"900px"}>
			<Text
				fontSize={"4xl"}
				textTransform={"uppercase"}
				fontWeight={"bold"}
				textAlign={"center"}
				my={2}
				bgGradient='linear(to-l, #0b85f8, #00ffff)'
				bgClip='text'
			>
				Today's Tasks
			</Text>
			{isLoading && (
				<Flex justifyContent={"center"} my={4}>
					<Spinner size={"xl"} />
				</Flex>
			)}
			{!isLoading && todos?.length === 0 && (
				<Alert
        status="success"
        variant="subtle"
        title="All tasks completed! 🎉"
				/>
			)}
			<Stack gap={3}>
				{todos?.map((todo) => (
					<TodoItem key={todo._id} todo={todo} />
				))}
			</Stack>
			</Container>

		</>
	);
};

export default TodoList;