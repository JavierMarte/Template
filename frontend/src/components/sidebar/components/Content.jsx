// chakra imports
import { useAuth0 } from '@auth0/auth0-react'
import { Box, Button, Divider, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import Links from 'components/sidebar/components/Links'
import React, { useCallback, useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { useHistory } from 'react-router-dom'

// FUNCTIONS
function SidebarContent(props) {
	const { routes, onSidebarToggle, isExpanded } = props
	//const [isExpanded, setIsExpanded] = useState(true);

	const toggleSidebar = () => {
		//setIsExpanded(!isExpanded);
		onSidebarToggle(isExpanded ? '0px' : '300px')
	}

	const { isAuthenticated, logout } = useAuth0()
	const history = useHistory()

	const handleLogout = useCallback(() => {
		logout({
			logoutParams: {
				returnTo: `${window.location.origin}/#/auth/logout`,
			},
		})
		localStorage.removeItem('logged_in_user')
		history.push('/auth/logout')
	}, [])

	// SIDEBAR
	return (
		<Flex
			direction='column'
			height='100%'
			pt='25px'
			px='16px'
			borderRadius='30px'
			position='relative'
		>
			{isExpanded ? (
				<>
					<Text fontWeight='bold' fontSize='24px' mb='20px'>
						Scale{' '}
						<Text
							fontWeight='bold'
							fontSize='24px'
							color={'blue.400'}
							as={'span'}
						>
							&
						</Text>{' '}
						Grow
					</Text>
					<Divider />
					<Box
						display={'flex'}
						flexDirection={'column'}
						justifyContent={'space-between'}
						height={'full'}
						paddingBottom={'20px'}
					>
						<Stack direction='column' mb='auto' mt='8px'>
							<Box ps='20px' pe={{ md: '16px', '2xl': '1px' }}>
								<Links routes={routes} isExpanded={isExpanded} />
							</Box>
						</Stack>
						{isAuthenticated && (
							<Button
								borderRadius={'8px'}
								colorScheme={'telegram'}
								onClick={handleLogout}
							>
								Logout
							</Button>
						)}
					</Box>
				</>
			) : (
				<Box
					display={'flex'}
					flexDirection={'column'}
					justifyContent={'space-between'}
					height={'full'}
					paddingBottom={'20px'}
				>
					<Stack direction='column' mb='auto' mt='2rem'>
						<Box>
							<Links routes={routes} isExpanded={isExpanded} />
						</Box>
					</Stack>
					<Icon
						as={BiLogOut}
						height={'20px'}
						width={'20px'}
						cursor={'pointer'}
						onClick={handleLogout}
					/>
				</Box>
			)}
		</Flex>
	)
}

export default SidebarContent
