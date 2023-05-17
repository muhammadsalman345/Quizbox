import { ISidebarLink, ISummaryInfoCard, ITableHeader } from "../interface";
import { FiCreditCard } from "react-icons/fi";
import { AiOutlineHome, AiOutlineProfile } from "react-icons/ai";
import { SlUser } from "react-icons/sl";
import { BsBox, BsQuestionSquare } from "react-icons/bs";
import { MdOutlineFeaturedPlayList, MdOutlineStorefront } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import NavigationRoutes from "../../../routes/NavigationRoutes";
import { GrLineChart } from "react-icons/gr";
import { BiUser } from "react-icons/bi";
import { colors } from "@mui/material";
import { primaryShades } from "../../../constants/AppColors";
import { GiTrophyCup } from "react-icons/gi";
import { RiPriceTag2Line } from "react-icons/ri";

///
export const SidebarLinks: ISidebarLink[] = [
  { title: "Home", Icon: AiOutlineHome, route: NavigationRoutes.home.root },
  {
    title: "Features",
    Icon: MdOutlineFeaturedPlayList,
    route: NavigationRoutes.home.features,
  },
  {
    title: "Competitions",
    Icon: GiTrophyCup,
    route: NavigationRoutes.home.competions,
  },
  { title: "Users", Icon: SlUser, route: NavigationRoutes.home.users },
  {
    title: "Courses",
    Icon: AiOutlineProfile,
    route: NavigationRoutes.home.courses,
  },
  {
    title: "Questions",
    Icon: BsQuestionSquare,
    route: NavigationRoutes.home.questions,
  },
  { title: "Configurations", Icon: MdOutlineStorefront },
  { title: "Payouts", Icon: FiCreditCard },
  { title: "Settings", Icon: IoSettingsOutline },
];

export const StatisticsSummaryDummy: ISummaryInfoCard[] = [
  {
    label: "competitions",
    iconContainerColor: primaryShades[100],
    value: "120k",
    Icon: GrLineChart,
    iconColor: primaryShades[700],
  },
  {
    label: "schools",
    value: "854",
    iconContainerColor: colors.green[100],
    Icon: BiUser,
    iconColor: colors.green[900],
  },
  {
    label: "students",
    value: "1.423k",
    Icon: BsBox,
    iconContainerColor: colors.red[200],
    iconColor: colors.red[900],
  },
  {
    label: "teachers",
    value: "745",
    Icon: BsBox,
    iconContainerColor: colors.cyan[100],
    iconColor: colors.cyan[700],
  },
];

export const SchoolTableCellHeader: ITableHeader[] = [
  { children: "SchoolName" },
  { children: "Location" },
  { children: "Population" },
  { children: "Date Joined" },
];
