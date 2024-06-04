/* eslint-disable */
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
// chakra imports
import {
	Box,
	Flex,
	HStack,
	Text,
	useColorModeValue,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
} from '@chakra-ui/react'
import { MdKeyboardArrowDown } from 'react-icons/md'

export function SidebarLinks(props) {
	//   Chakra color mode
	let location = useLocation()
	let activeColor = useColorModeValue('gray.700', 'white')
	let inactiveColor = useColorModeValue(
		'secondaryGray.600',
		'secondaryGray.600'
	)
	let activeIcon = useColorModeValue('blue.400', 'white')
	let textColor = useColorModeValue('secondaryGray.500', 'white')
	let brandColor = useColorModeValue('blue.400', 'blue.400')

	const { routes, isExpanded } = props

	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName) => {
		if (location.pathname.includes('/admin/') && routeName === '/admin') {
			return location.pathname === '/admin/admin' ? true : false
		}
		return location.pathname.includes(routeName)
	}

	// this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
	const createLinks = (routes) => {
		const renderRoutes =
			localStorage.getItem('logged_in_user') &&
			String(
				JSON.parse(localStorage.getItem('logged_in_user'))?.role
			).toLowerCase() === 'admin'
				? routes
				: routes.filter((route) => route.name !== 'Admin Center')
		return renderRoutes.map((route, index) => {
			if (route.category) {
				return (
					<>
						<Text
							fontSize={'md'}
							color={activeColor}
							fontWeight='bold'
							mx='auto'
							ps={{
								sm: '10px',
								xl: '16px',
							}}
							pt='18px'
							pb='12px'
							key={index}
						>
							{route.name}
						</Text>
						{createLinks(route.items)}
					</>
				)
			} else if (
				route.layout === '/admin' ||
				// route.layout === "/auth" ||
				route.layout === '/rtl'
			) {
				return (
					<NavLink key={index} to={route.layout + route.path}>
						{route.icon && !route.items && route.name != 'Flow create' ? (
							<Box>
								{!isExpanded ? (
									<HStack py='5px'>
										<Flex>
											<Box
												color={
													activeRoute(route.path.toLowerCase())
														? activeIcon
														: textColor
												}
												title={route.name}
											>
												{route.icon}
											</Box>
											{route.items ? <MdKeyboardArrowDown /> : ''}
										</Flex>
										<Box
											h='36px'
											w='4px'
											bg={
												activeRoute(route.path.toLowerCase())
													? brandColor
													: 'transparent'
											}
											borderRadius='5px'
										/>
									</HStack>
								) : (
									<HStack
										spacing={
											activeRoute(route.path.toLowerCase()) ? '22px' : '26px'
										}
										py='5px'
										ps='10px'
									>
										<Flex w='100%' alignItems='center' justifyContent='center'>
											<Box
												color={
													activeRoute(route.path.toLowerCase())
														? activeIcon
														: textColor
												}
												me='18px'
											>
												{route.icon}
											</Box>
											<Text
												me='auto'
												color={
													activeRoute(route.path.toLowerCase())
														? activeColor
														: textColor
												}
												fontWeight={
													activeRoute(route.path.toLowerCase())
														? 'bold'
														: 'normal'
												}
											>
												{route.name}
											</Text>
											{route.items ? <MdKeyboardArrowDown /> : ''}
										</Flex>
										<Box
											h='36px'
											w='4px'
											bg={
												activeRoute(route.path.toLowerCase())
													? brandColor
													: 'transparent'
											}
											borderRadius='5px'
										/>
									</HStack>
								)}
							</Box>
						) : (
							<>
								{routes.items ? (
									<Box>
										{isExpanded ? (
											<HStack
												spacing={
													activeRoute(route.path.toLowerCase())
														? '22px'
														: '26px'
												}
												py='5px'
												ps='10px'
											>
												<Text
													me='auto'
													color={
														activeRoute(route.path.toLowerCase())
															? activeColor
															: inactiveColor
													}
													fontWeight={
														activeRoute(route.path.toLowerCase())
															? 'bold'
															: 'normal'
													}
												>
													{route.name}
												</Text>
												<Box
													h='36px'
													w='4px'
													bg='brand.400'
													borderRadius='5px'
												/>
											</HStack>
										) : (
											<HStack>
												<Text
													me='auto'
													color={
														activeRoute(route.path.toLowerCase())
															? activeColor
															: inactiveColor
													}
													fontWeight={
														activeRoute(route.path.toLowerCase())
															? 'bold'
															: 'normal'
													}
												>
													{route.name}
												</Text>
												<Box
													h='36px'
													w='4px'
													bg='brand.400'
													borderRadius='5px'
												/>
											</HStack>
										)}
									</Box>
								) : (
									''
								)}
							</>
						)}
						{route.items && (
							<Accordion allowToggle>
								<AccordionItem border='none'>
									<AccordionButton p={0} _focus={{ boxShadow: 'none' }}>
										<Box flex='1' textAlign='left'>
											<Flex w='100%'>
												{isExpanded ? (
													<HStack
														spacing={
															activeRoute(route.path.toLowerCase())
																? '22px'
																: '26px'
														}
														py='5px'
														ps='10px'
													>
														<Flex
															w='100%'
															alignItems='center'
															justifyContent='center'
														>
															<Box
																color={
																	activeRoute(route.path.toLowerCase())
																		? activeIcon
																		: textColor
																}
																me='18px'
															>
																{route.icon}
															</Box>
															<Text
																me='auto'
																color={
																	activeRoute(route.path.toLowerCase())
																		? activeColor
																		: textColor
																}
																fontWeight={
																	activeRoute(route.path.toLowerCase())
																		? 'bold'
																		: 'normal'
																}
															>
																{route.name}
															</Text>
														</Flex>
													</HStack>
												) : (
													<HStack>
														<Flex
															w='100%'
															alignItems='center'
															justifyContent='center'
														>
															<Box
																color={
																	activeRoute(route.path.toLowerCase())
																		? activeIcon
																		: textColor
																}
																title={route.name}
															>
																{route.icon}
															</Box>
														</Flex>
													</HStack>
												)}
											</Flex>
										</Box>
										<AccordionIcon />
									</AccordionButton>
									<AccordionPanel pb={4} ml={'-8px'}>
										{createLinks(route.items)}
									</AccordionPanel>
								</AccordionItem>
							</Accordion>
						)}
					</NavLink>
				)
			}
		})
	}
	//  BRAND
	return createLinks(routes)
}

export default SidebarLinks
