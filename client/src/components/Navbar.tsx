import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useColorMode } from './ui/color-mode';
export default function Navbar() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Container maxW={"900px"}>
			<Box px={4} my={4} borderRadius={"md"} borderWidth={1}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					{/* LEFT SIDE */}
					<Flex
						justifyContent={"center"}
						alignItems={"center"}
						gap={3}
					>
						<img src='/go.png' alt='logo' width={30} height={30} />
					<Text fontSize={"xl"} fontWeight={800}>
							GoDo
						</Text>
					</Flex>

					{/* RIGHT SIDE */}
					<Flex alignItems={"center"} gap={3}>

						{/* Toggle Color Mode */}
						<Button onClick={toggleColorMode}>
							{colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
						</Button>
					</Flex>
				</Flex>
			</Box>
		</Container>
	);
}