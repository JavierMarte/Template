import React, { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Text,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Checkbox,
    Input,
    IconButton,
    useToast,
    Textarea,
    Spinner,
} from "@chakra-ui/react";
import { FaDotCircle } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { IoMailUnreadOutline } from "react-icons/io5";
import { MdOutlineSms } from "react-icons/md";
import { RiContactsBookLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { set } from 'lodash';

const localizer = momentLocalizer(moment);

const data = [
    {
        theme: "Customer tracking",
        title: "Weekly summary",
        data: [
            {
                icon: <IoPeopleOutline size={30} color='green' />,
                title: "New Clients",
                value: "125"
            },
            {
                icon: <FaTasks size={30} color='green' />,
                title: "Screened",
                value: "87"
            },
            {
                icon: <MdOutlineSms size={30} color='green' />,
                title: "Sms",
                value: "42"
            },

        ]
    },

]

 const datacontacts = [
//     {
//         theme: "",
//         title: "Account summary",
//         data: [
//             {
//                 icon: <RiContactsBookLine size={30} color='green' />,
//                 title: "Contacts",
//                 value: "215"
//             }
//         ]
//     }

 ]

const Index = () => {
    const { user } = useAuth0();
    const cancelRef = React.useRef()
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isShowing, setIsShowing] = useState(false);
    const [events, setEvents] = useState([
        {
            start: new Date(2024, 4, 10, 10, 30),
            end: new Date(2024, 4, 10, 11, 0),
            title: 'Scheduled Email to John Doe',
            type: 'email',
        },
        {
            start: new Date(2024, 4, 11, 14, 0),
            end: new Date(2024, 4, 11, 14, 30),
            title: 'Scheduled Call with Jane Smith',
            type: 'call',
        },
        {
            start: new Date(2024, 4, 12, 16, 0),
            end: new Date(2024, 4, 12, 16, 30),
            title: 'Scheduled SMS to Michael Johnson',
            type: 'sms',
        },
    ]);
    const [arrivalTimes, setArrivalTimes] = useState({
        sms: '',
        calls: '',
        summaries: '',
        emails: '',
        contacts: '',
    });
    const [contacts, setContacts] = useState([]);
    const [notifications, setNotifications] = useState({
        smsNotifications: false,
        callNotifications: false,
        emailNotifications: false,
    });
    const toast = useToast();
    const [emailSchedule, setEmailSchedule] = useState({
        to: '',
        subject: '',
        body: '',
        sendDate: '',
    });
    const [smsSchedule, setSmsSchedule] = useState({
        to: '',
        contact: '',
        body: '',
        smsDate: '',
        smsTime: '',
    });
    const [callSchedule, setCallSchedule] = useState({
        contact: '',
        callDate: '',
        callTime: '',
    });
    const [summary, setSummary] = useState(data);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const loggedInUser = JSON.parse(localStorage.getItem('logged_in_user'));
                const userEmail = loggedInUser?.email;
                const accCode = loggedInUser?.accCode;
                const clients = await axios.get(process.env.REACT_APP_API_URL + '/clients/agentemail/' + user.email);
                const screened = await axios.post(`${process.env.REACT_APP_BACKEND}/plaidClients/listbycode`, {
                    accCode: accCode,
                });
                let newData = [...summary];
                const agent = await axios.get(process.env.REACT_APP_API_URL + '/agents/byemail/' + user.email);
                const sms = await axios.get(process.env.REACT_APP_API_URL + '/agents/messages/' + agent.data.agent.id);
                newData[0].data[0].value = clients.data.length;
                newData[0].data[1].value = screened.data.plaidClients.length;
                newData[0].data[2].value = sms.data.messages.length;
                setSummary(newData);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmailSchedule({ ...emailSchedule, [name]: value });
    };

    const handleCallChange = (e) => {
        const { name, value } = e.target;
        setCallSchedule({ ...callSchedule, [name]: value });
    };

    const handleSubmitSchedule = () => {
        toast({
            title: 'Scheduling saved',
            description: 'The scheduling has been saved successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
        setIsOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArrivalTimes({ ...arrivalTimes, [name]: value });
    };

    const handleAddContact = () => {
        const newContact = prompt('Enter the name of the new contact');
        if (newContact) {
            setContacts([...contacts, newContact]);
        }
    };

    const handleEditContact = (index) => {
        const newName = prompt('Enter the new name for the contact', contacts[index]);
        if (newName) {
            const updatedContacts = [...contacts];
            updatedContacts[index] = newName;
            setContacts(updatedContacts);
        }
    };

    const handleDeleteContact = (index) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this contact?');
        if (confirmDelete) {
            const updatedContacts = [...contacts];
            updatedContacts.splice(index, 1);
            setContacts(updatedContacts);
        } 
    };

    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setNotifications({ ...notifications, [name]: checked });
    };

    const handleSubmit = () => {
        toast({
            title: 'Configuration saved',
            description: 'The configuration has been saved successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
        setIsOpen(false);
    };

    return (
        <>
            <Box w={"100%"} p={5} bg={"gray.150"}>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                        <Spinner size="xl" />
                    </Box>
                ) : (
                    <Box>
                        <Modal isOpen={isShowing} onClose={() => setIsShowing(false)}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Schedule Email/Call</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Tabs>
                                        <TabList>
                                            <Tab>Schedule Email</Tab>
                                            <Tab>Schedule Call</Tab>
                                            <Tab>Schedule SMS</Tab>
                                        </TabList>

                                        <TabPanels>
                                            <TabPanel>
                                                <Input
                                                    name="to"
                                                    placeholder="To"
                                                    value={emailSchedule.to}
                                                    onChange={handleEmailChange}
                                                    mb={4}
                                                />
                                                <Input
                                                    name="subject"
                                                    placeholder="Subject"
                                                    value={emailSchedule.subject}
                                                    onChange={handleEmailChange}
                                                    mb={4}
                                                />
                                                <Textarea
                                                    name="body"
                                                    placeholder="Email body"
                                                    value={emailSchedule.body}
                                                    onChange={handleEmailChange}
                                                    mb={4}
                                                />
                                                <Input
                                                    name="sendDate"
                                                    type="datetime-local"
                                                    placeholder="Send date and time"
                                                    value={emailSchedule.sendDate}
                                                    onChange={handleEmailChange}
                                                    mb={4}
                                                />
                                            </TabPanel>
                                            <TabPanel>
                                                <Input
                                                    name="contact"
                                                    placeholder="Contact name"
                                                    value={callSchedule.contact}
                                                    onChange={handleCallChange}
                                                    mb={4}
                                                />
                                                <Input
                                                    name="callDate"
                                                    type="date"
                                                    placeholder="Call date"
                                                    value={callSchedule.callDate}
                                                    onChange={handleCallChange}
                                                    mb={4}
                                                />
                                                <Input
                                                    name="callTime"
                                                    type="time"
                                                    placeholder="Call time"
                                                    value={callSchedule.callTime}
                                                    onChange={handleCallChange}
                                                    mb={4}
                                                />
                                            </TabPanel>
                                            <TabPanel>
                                                <Input
                                                    name="to"
                                                    placeholder="To"
                                                    value={smsSchedule.to}
                                                    onChange={handleEmailChange}
                                                    mb={4}
                                                />
                                                <Input
                                                    name="subject"
                                                    placeholder="Subject"
                                                    value={smsSchedule.subject}
                                                    onChange={handleEmailChange}
                                                    mb={4}
                                                />
                                                <Textarea
                                                    name="body"
                                                    placeholder="Email body"
                                                    value={smsSchedule.body}
                                                    onChange={handleEmailChange}
                                                    mb={4}
                                                />
                                                <Input
                                                    name="sendDate"
                                                    type="datetime-local"
                                                    placeholder="Send date and time"
                                                    value={smsSchedule.smsDate}
                                                    onChange={handleEmailChange}
                                                    mb={4}
                                                />
                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme="blue" mr={3} onClick={handleSubmitSchedule}>
                                        Save
                                    </Button>
                                    <Button variant="ghost" onClick={() => setIsShowing(false)}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Schedule Configuration</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Tabs>
                                        <TabList>
                                            <Tab>Arrival Times</Tab>
                                            <Tab>Manage Contacts</Tab>
                                            <Tab>Notifications</Tab>
                                        </TabList>

                                        <TabPanels>
                                            <TabPanel>
                                                <Input
                                                    name="sms"
                                                    type='time'
                                                    placeholder="SMS arrival time"
                                                    value={arrivalTimes.sms}
                                                    onChange={handleInputChange}
                                                    mb={4}
                                                />
                                                <Input
                                                    name="calls"
                                                    placeholder="Calls arrival time"
                                                    value={arrivalTimes.calls}
                                                    onChange={handleInputChange}
                                                    mb={4}
                                                    type='time'

                                                />
                                                <Input
                                                    name="summaries"
                                                    placeholder="Summaries arrival time"
                                                    value={arrivalTimes.summaries}
                                                    onChange={handleInputChange}
                                                    mb={4}
                                                    type='time'

                                                />
                                                <Input
                                                    name="emails"
                                                    placeholder="Emails arrival time"
                                                    value={arrivalTimes.emails}
                                                    onChange={handleInputChange}
                                                    mb={4}
                                                    type='time'

                                                />
                                                <Input
                                                    name="contacts"
                                                    placeholder="Contacts arrival time"
                                                    value={arrivalTimes.contacts}
                                                    onChange={handleInputChange}
                                                    mb={4}
                                                    type='time'

                                                />
                                            </TabPanel>
                                            <TabPanel>
                                                <Button onClick={handleAddContact} colorScheme="teal" mr={2} mb={2}>
                                                    <AddIcon mr={2} />
                                                    Add Contact
                                                </Button>
                                                {contacts.map((contact, index) => (
                                                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                                        <span>{contact}</span>
                                                        <IconButton
                                                            icon={<EditIcon />}
                                                            aria-label="Edit contact"
                                                            ml={2}
                                                            onClick={() => handleEditContact(index)}
                                                            color={"blue.600"}
                                                        />
                                                        <IconButton
                                                            icon={<DeleteIcon />}
                                                            aria-label="Delete contact"
                                                            ml={2}
                                                            onClick={() => handleDeleteContact(index)}
                                                            color={"red.600"}
                                                        />
                                                    </div>
                                                ))}

                                            </TabPanel>
                                            <TabPanel>
                                                <Checkbox
                                                    name="smsNotifications"
                                                    isChecked={notifications.smsNotifications}
                                                    onChange={handleNotificationChange}
                                                    mb={4}
                                                >
                                                    Receive SMS notifications
                                                </Checkbox>
                                                <Checkbox
                                                    name="callNotifications"
                                                    isChecked={notifications.callNotifications}
                                                    onChange={handleNotificationChange}
                                                    mb={4}
                                                >
                                                    Receive call notifications
                                                </Checkbox>
                                                <Checkbox
                                                    name="emailNotifications"
                                                    isChecked={notifications.emailNotifications}
                                                    onChange={handleNotificationChange}
                                                    mb={4}
                                                >
                                                    Receive email notifications
                                                </Checkbox>
                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                                        Save
                                    </Button>
                                    <Button variant="ghost" onClick={() => setIsOpen(false)}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                        <Heading mb={5} >Agent Dashboard</Heading>
                        <Box display={"flex"} gap={1} mb={10} alignItems={"center"}>

                            {/* <Button variant={"outline"} colorScheme={"telegram"} onClick={() => setIsShowing(true)}>DashBoard</Button> */}
                        </Box>

                        {/* <Box mb={10}>
                            <Box w={"100%"}>
                                <Heading mb={5} color={"blue.600"} size={"h1"} textAlign={"center"}>Calendar</Heading>
                            </Box>
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 500 }}
                                views={['month', 'week', 'day']}
                                eventPropGetter={(event) => {
                                    const color =
                                        event.type === 'email'
                                            ? 'blue'
                                            : event.type === 'call'
                                                ? 'green'
                                                : 'purple';
                                    return { style: { backgroundColor: color, color: 'white' } };
                                }}
                            />
                        </Box> */}
                        <Box display={"flex"} flexDir={"column"} alignItems={"center"}>

                            {summary.length > 0 && summary.map((item, index) => {
                                return (
                                    <Card w={"90%"} mb={10} key={index}>
                                        <CardHeader>
                                            {item.theme}
                                            <Heading color={"blue.600"}>{item.title}</Heading>
                                        </CardHeader>
                                        <CardBody>
                                            <Box w={"100%"} display={item.theme === "Updates" ? "grid" : "flex"}
                                                gridTemplateColumns={item.theme === "Updates" && "repeat(2, 1fr)"}
                                                gap={5}
                                                alignItems={"center"}
                                                justifyContent={"space-around"}
                                                ml={item.theme === "Updates" && 10}
                                            >
                                                {item.data.map((data, index) => {
                                                    return (
                                                        <Box display={"flex"} gap={2} alignItems={"center"} key={index}>
                                                            {data.icon}
                                                            <Box>
                                                                <Text>{data.title}</Text>
                                                                <Text>{data.value}</Text>
                                                            </Box>
                                                        </Box>
                                                    )
                                                })}
                                            </Box>
                                        </CardBody>
                                        <CardFooter>
                                            {/* <Box w={"100%"} display={"flex"} justifyContent={"end"}>
                                                <Button
                                                    variant={"outline"}
                                                    colorScheme={"blue"}
                                                    gap={2}
                                                    onClick={() => setIsOpen(true)}
                                                >
                                                    Settings
                                                    <IoSettingsOutline />
                                                </Button>
                                            </Box> */}
                                        </CardFooter>
                                    </Card>
                                )

                            }
                            )}
                        </Box>

                        {/* <Box display={"flex"} flexDir={"column"} alignItems={"center"}>

                            {datacontacts.length > 0 && datacontacts.map((item, index) => {
                                return (
                                    <Card w={"90%"} mb={10} key={index}>
                                        <CardHeader>
                                            {item.theme}
                                            <Heading color={"blue.600"}>{item.title}</Heading>
                                        </CardHeader>
                                        <CardBody>
                                            <Box w={"100%"} display={item.theme === "Updates" ? "grid" : "flex"}
                                                gridTemplateColumns={item.theme === "Updates" && "repeat(2, 1fr)"}
                                                gap={5}
                                                alignItems={"center"}
                                                justifyContent={"space-around"}
                                                ml={item.theme === "Updates" && 10}
                                            >
                                                {item.data.map((data, index) => {
                                                    return (
                                                        <Box display={"flex"} gap={2} alignItems={"center"} key={index}>
                                                            {data.icon}
                                                            <Box>
                                                                <Text>{data.title}</Text>
                                                                <Text>{data.value}</Text>
                                                            </Box>
                                                        </Box>
                                                    )
                                                })}
                                            </Box>
                                        </CardBody>
                                        <CardFooter>
                                         <Box w={"100%"} display={"flex"} justifyContent={"end"}>
                                                <Button
                                                    variant={"outline"}
                                                    colorScheme={"blue"}
                                                    gap={2}
                                                    onClick={() => setIsOpen(true)}
                                                >
                                                    Settings
                                                    <IoSettingsOutline />
                                                </Button>
                                            </Box> 
                                        </CardFooter>
                                    </Card>
                                )

                            }
                            )}
                        </Box> */}

                    </Box>
                )}
            </Box>
        </>
    );
}

export default Index;
