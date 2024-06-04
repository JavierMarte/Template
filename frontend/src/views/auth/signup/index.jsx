import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";

import axios from 'axios';
import { Logger } from "utils/logger";

const logger = new Logger("Signup");

function SignUp() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );

  const [formData, setFormData] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined
  });

  const history = useHistory();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      // Handle error: Passwords do not match
      return;
    }

    try {
      // Make a POST request to the Express.js API endpoint for signup
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, {
        username: formData.username,
        email_address: formData.email,
        password: formData.password
      });

      // Handle response, e.g., showing a success message, redirecting, etc.
      logger.log('Signup Successful', response.data);
      history.push('/auth/signin'); // Redirect to sign-in page after successful signup
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle duplicate email error
        logger.error('Signup failed: Email already in use');
      } else {
        logger.error('Signup failed', error);
      }
    }
  };

  return (
    <Flex
      maxW={{ base: "100%", md: "max-content" }}
      w='100%'
      mx={{ base: "auto", lg: "0px" }}
      me='auto'
      h='100%'
      alignItems='start'
      justifyContent='center'
      mb={{ base: "30px", md: "60px" }}
      px={{ base: "25px", md: "0px" }}
      mt={{ base: "5px", md: "5vh" }}
      flexDirection='column'>
      <Box w="100%" textAlign="center">
        <Heading color={textColor} fontSize='36px' mb='10px'>
          Sign Up
        </Heading>
        <Text
          mb='36px'
          ms='4px'
          color={textColorSecondary}
          fontWeight='400'
          fontSize='md'>
          Create your account to get started!
        </Text>
      </Box>
      <Flex
        zIndex='2'
        direction='column'
        w={{ base: "100%", md: "420px" }}
        maxW='100%'
        background='transparent'
        borderRadius='15px'
        mx={{ base: "auto", lg: "unset" }}
        me='auto'
        mb={{ base: "20px", md: "auto" }}>
        <form onSubmit={handleSignUp}>
          <FormControl isRequired isInvalid={formData.username === ''}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <Text color="red.500" fontSize="sm">
              {formData.username === '' && 'Username is required'}
            </Text>
          </FormControl>
          <FormControl isRequired isInvalid={formData.email === ''}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Text color="red.500" fontSize="sm">
              {formData.email === '' && 'Email is required'}
            </Text>
          </FormControl>

          <FormControl isRequired isInvalid={formData.password === '' || formData.password.length < 8}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <Text color="red.500" fontSize="sm">
              {formData.password === '' && 'Password is required'}
              {formData.password.length > 0 && formData.password.length < 8 && 'Password must be at least 8 characters'}
            </Text>
          </FormControl>

          <FormControl isRequired isInvalid={formData.confirmPassword === '' || formData.confirmPassword !== formData.password}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
            <Text color="red.500" fontSize="sm">
              {formData.confirmPassword === '' && 'Confirm Password is required'}
              {formData.confirmPassword !== formData.password && 'Passwords do not match'}
            </Text>
          </FormControl>

          {/* Add other form fields and submit button */}
          <Flex my='25px'>
            <FormControl>
              <Button
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'
                type="submit"
              >
                Sign Up
              </Button>
            </FormControl>
          </Flex>
        </form>


        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='start'
          maxW='100%'
          mt='0px'>
          <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
            Already have an account?
            <NavLink to='/auth/signin'>
              <Text
                color={textColorBrand}
                as='span'
                ms='5px'
                fontWeight='500'>
                Sign In
              </Text>
            </NavLink>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignUp;
