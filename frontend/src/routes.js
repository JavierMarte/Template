
import React from "react";

import { Icon } from "@chakra-ui/react";

import { GrUserAdmin } from "react-icons/gr";

import schedule from "views/admin/schedule";


const routes = [
  {
    name: "DASHBOARD",
    layout: "/admin",
    icon: <Icon as={GrUserAdmin} width="20px" height="20px" color="inherit" />,
    path: "/admin",
    component: schedule,
  }

];
export default routes;