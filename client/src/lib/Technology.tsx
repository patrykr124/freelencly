import { Figma } from "lucide-react";
import { BiLogoAdobe, BiLogoJavascript } from "react-icons/bi";
import { FaAngular, FaHtml5, FaJava, FaPython, FaReact, FaVuejs, FaWordpress } from "react-icons/fa";

export const technologyData = [
    {
        id: 1,
        name: 'Wordpress',
        icon: <FaWordpress/>,
        categories: ['web_development']
    },
    {
        id: 2,
        name: 'React',
        icon: <FaReact/>,
        categories: ['web_development', 'mobile_development']
    },
    {
        id: 3,
        name: 'JavaScript',
        icon: <BiLogoJavascript/>,
        categories: ['web_development']
    },
    {
        id: 4,
        name: 'Vue',
        icon: <FaVuejs/>,
        categories: ['web_development']
    },
    {
        id: 5,
        name: 'HTML',
        icon: <FaHtml5/>,
        categories: ['web_development']
    },
    {
        id: 6,
        name: 'Java',
        icon: <FaJava/>,
        categories: ['web_development', 'mobile_development']
    },
    {
        id: 7,
        name: 'Python',
        icon: <FaPython/>,
        categories: ['web_development']
    },
    {
        id: 8,
        name: 'Angular',
        icon: <FaAngular/>,
        categories: ['web_development']
    },
    // UI/UX
    {
        id: 9,
        name: 'Figma',
        icon: <Figma/>,
        categories: ['ui_ux_design']
    },
    {
        id: 10,
        name: 'Adobe XD',
        icon: <BiLogoAdobe/>,
        categories: ['ui_ux_design']
    },
    // Graphic Design
    {
        id: 11,
        name: 'Photoshop',
        icon: <BiLogoAdobe/>,
        categories: ['graphic_design']
    },
    {
        id: 12,
        name: 'Illustrator',
        icon: <BiLogoAdobe/>,
        categories: ['graphic_design']
    },
];