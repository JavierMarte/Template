import React, { useEffect, useState } from 'react'

// chakra imports
import {
	Box,
	Flex,
	Drawer,
	DrawerBody,
	Icon,
	useColorModeValue,
	DrawerOverlay,
	useDisclosure,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	IconButton,
	Divider,
} from '@chakra-ui/react'
import Content from 'components/sidebar/components/Content'

import {
	renderThumb,
	renderTrack,
	renderView,
} from 'components/scrollbar/Scrollbar'
import { Scrollbars } from 'react-custom-scrollbars-2'
import PropTypes from 'prop-types'

// Assets
import { IoCloseCircle, IoMenuOutline } from 'react-icons/io5'
import { ChevronLeftIcon, CheckIcon, ChevronRightIcon } from '@chakra-ui/icons'

function Sidebar(props) {
	const { routes, togglewidth, setMainWidth } = props
	const [isMobile, setIsMobile] = useState(false)
	let variantChange = '0.2s linear'
	let shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
		'unset'
	)
	const [isExpanded, setIsExpanded] = useState(true)

	const [sidebarWidth, setSidebarWidth] = useState('20vw')
	const handleSidebarToggle = (width) => {
		setSidebarWidth(width)
	}
	const toggleSidebar = () => {
		setIsExpanded(!isExpanded)
		setSidebarWidth(isExpanded ? '0px' : '20vw')
		setMainWidth(isExpanded ? 'calc(100% - 70px)' : 'calc(100% - 310px)')
	}

	useEffect(() => {
		const handleResize = () => {
			const isMobileDevice = window.innerWidth <= 768
			setIsMobile(isMobileDevice)
		}

		const isMobileDevice = window.innerWidth <= 768
		setIsMobile(isMobileDevice)

		window.addEventListener('resize', handleResize)

		handleResize()

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	// Chakra Color Mode
	let sidebarBg = useColorModeValue('white', 'navy.800')
	let sidebarMargins = '0px'

	// SIDEBAR
	return (
		<>
			{isMobile ? (
				<SidebarResponsive routes={routes} />
			) : (
				<Box w='10px' position='fixed' minH='100%'>
					<IconButton
						icon={isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
						onClick={toggleSidebar}
						size='sm'
						position='absolute'
						top={isExpanded ? '25px' : '10px'}
						left={isExpanded ? '250px' : '12px'}
						zIndex='1'
						isRound={true}
						variant='solid'
						color={'white'}
						bgColor={'blue.400'}
						colorScheme='blue'
						aria-label='Toggle Sidebar'
						fontSize='20px'
					/>
					<Box
						bg={sidebarBg}
						transition={variantChange}
						w={isExpanded ? '300px' : '60px'}
						h='100vh'
						m={sidebarMargins}
						minH='100%'
						overflowX='hidden'
						boxShadow={shadow}
						transform={
							sidebarWidth === '60px' ? 'translateX(-100%)' : 'translateX(0)'
						}
					>
						<Scrollbars
							autoHide
							renderTrackVertical={renderTrack}
							renderThumbVertical={renderThumb}
							renderView={renderView}
						>
							<Content
								routes={routes}
								onSidebarToggle={handleSidebarToggle}
								isExpanded={isExpanded}
							/>
						</Scrollbars>
					</Box>
				</Box>
			)}
		</>
	)
}
// FUNCTIONS
export function SidebarResponsive(props) {
	let sidebarBackgroundColor = useColorModeValue('white', 'navy.800')
	let menuColor = useColorModeValue('gray.800', 'white')
	// // SIDEBAR
	//const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef()

	const [isOpen, setIsOpen] = useState(false)

	const { routes } = props
	// let isWindows = navigator.platform.startsWith("Win");
	//  BRAND

	const toggleDrawer = () => {
		setIsOpen(!isOpen)
	}

	return (
		<Flex
			display={{ sm: 'flex', xl: 'none' }}
			alignItems='center'
			position='relative'
			zIndex={9999999}
		>
			<Flex ref={btnRef} w='max-content' h='max-content' onClick={toggleDrawer}>
				<Icon
					as={isOpen ? IoCloseCircle : IoMenuOutline}
					color={menuColor}
					my='auto'
					w='30px'
					h='30px'
					me='10px'
					_hover={{ cursor: 'pointer' }}
				/>
			</Flex>
			<Drawer
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				placement={document.documentElement.dir === 'rtl' ? 'right' : 'left'}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent maxW='285px' bg={sidebarBackgroundColor}>
					<DrawerBody maxW='285px' px='0rem' pb='0'>
						<Scrollbars
							autoHide
							renderTrackVertical={renderTrack}
							renderThumbVertical={renderThumb}
							renderView={renderView}
						>
							<Content routes={routes} isExpanded={true} />
						</Scrollbars>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Flex>
	)
}
// PROPS

Sidebar.propTypes = {
	logoText: PropTypes.string,
	routes: PropTypes.arrayOf(PropTypes.object),
	variant: PropTypes.string,
}

export default Sidebar
