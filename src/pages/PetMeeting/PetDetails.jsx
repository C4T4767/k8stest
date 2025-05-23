import React, { useRef } from "react";
import PetData from "../../mock/PetMeeting/petData.json";
import Male from "../../assets/images/PetMeeting/male.svg";
import Female from "../../assets/images/PetMeeting/female.svg";
import Theme from "../../theme/theme.js";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Box, Button, Typography } from "@mui/material";
import PetImgSlide from "../../components/PetMeeting/PetImgSlide.jsx";
import petTypes from "../../constants/petTypes.js";
import { useNavigate } from "react-router-dom";
import TitleBar from "../../components/Global/TitleBar.jsx";

const PetDetails = () => {
    const petData = useRef(PetData);
    const petDetails = petData.current;
    const navigate = useNavigate();

    const getAge = (birthDateString) => {
        const birthDate = new Date(birthDateString);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    };

    return (
        <Box>
            <TitleBar name={"친구 프로필"} />
            <Box
                sx={{
                    width: "100% - 20px",
                    margin: "0 10px 75px 10px",
                    pb: "0",
                }}
            >
                <PetImgSlide petDetails={petDetails} />
                <Typography
                    sx={{
                        mt: "0",
                        fontSize: "25px",
                        display: "inline",
                        verticalAlign: "middle",
                    }}
                >
                    {petDetails.name}
                </Typography>
                <Box
                    component="img"
                    src={petDetails.gender == "MALE" ? Male : Female}
                    sx={{
                        verticalAlign: "middle",
                        color: "blue",
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        m: "10px 0",
                    }}
                >
                    <Typography
                        sx={{
                            p: "5px 15px",
                            borderRadius: "20px",
                            backgroundColor: "#FFEBCD",
                            fontSize: "20px",
                            display: "inline",
                            verticalAlign: "middle",
                            color: "rgba(0, 0, 0, 0.5)",
                            margin: "0 2%",
                        }}
                    >
                        {petTypes[petDetails.petType]}
                    </Typography>
                    <Typography
                        sx={{
                            p: "5px 15px",
                            borderRadius: "20px",
                            backgroundColor: "#E0CDFF",
                            fontSize: "20px",
                            display: "inline",
                            verticalAlign: "middle",
                            color: "rgba(0, 0, 0, 0.5)",
                            margin: "0 2%",
                        }}
                    >
                        {getAge(petDetails.birth)}세
                    </Typography>
                    <Typography
                        sx={{
                            p: "5px 15px",
                            borderRadius: "20px",
                            backgroundColor: "#FFCDD6",
                            fontSize: "20px",
                            display: "inline",
                            verticalAlign: "middle",
                            color: "rgba(0, 0, 0, 0.5)",
                            margin: "0 2%",
                        }}
                    >
                        {petDetails.weight}KG
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        fontSize: "20px",
                    }}
                >
                    정보
                </Typography>
                <Typography
                    sx={{
                        fontSize: "16px",
                        color: "rgba(0, 0, 0, 0.5)",
                    }}
                >
                    생년월일 : {petDetails.birth}
                    <br />
                    중성화 : {petDetails.neutured ? "O" : "X"}
                    <br />
                    소개 : {petDetails.info}
                </Typography>
                <Box
                    sx={{
                        position: "fixed",
                        bottom: "60px",
                        left: "10px",
                        right: "10px",
                        height: "75px",
                        maxWidth: "480px",
                        margin: "0 auto",
                        backgroundColor: "white",
                        zIndex: 999,
                    }}
                />
                <Button
                    onClick={() => navigate("/chat/room/undefined")}
                    sx={{
                        position: "fixed",
                        bottom: "85px",
                        left: "10px",
                        right: "10px",
                        maxWidth: "480px",
                        backgroundColor: Theme.brand3,
                        borderRadius: "10px",
                        color: "white",
                        zIndex: 1000,
                        margin: "0 auto",
                    }}
                >
                    채팅하기
                </Button>
            </Box>
        </Box>
    );
};

export default PetDetails;
