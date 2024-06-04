import React, { useState } from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export function SearchBar(props) {
  const {
    variant,
    background,
    placeholder,
    borderRadius,
    suggestions,
    onSuggestionSelect,
    ...rest
  } = props;

  const searchIconColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
  const inputText = useColorModeValue("gray.700", "gray.100");

  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (value) => {
    setSearchValue(value);
  };

  return (
    <AutoComplete
      value={searchValue}
      onChange={handleInputChange}
      onSelect={(value) => onSuggestionSelect(value)}
    >
      <InputGroup w={{ base: "100%", md: "200px" }} {...rest}>
        <InputLeftElement
          children={
            <IconButton
              bg="inherit"
              borderRadius="inherit"
              _hover="none"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
              icon={
                <SearchIcon color={searchIconColor} w="15px" h="15px" />
              }
            ></IconButton>
          }
        />
        <AutoCompleteInput
          variant="search"
          fontSize="sm"
          bg={background ? background : inputBg}
          color={inputText}
          fontWeight="500"
          _placeholder={{ color: "gray.400", fontSize: "14px" }}
          borderRadius={borderRadius ? borderRadius : "30px"}
          placeholder={placeholder ? placeholder : "Search..."}
        />
      </InputGroup>
      <AutoCompleteList>
        {suggestions.map((item, index) => (
          <AutoCompleteItem
            key={index}
            value={item.name}
            textTransform="capitalize"
          >
            <Link to={`/admin${item.path}`} textDecoration="none" color="inherit">
              {item.name}
            </Link>
          </AutoCompleteItem>
        ))}
      </AutoCompleteList>
    </AutoComplete>
  );
}
