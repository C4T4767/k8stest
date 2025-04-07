import React, { useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Plus from "../../assets/images/PetMeeting/plus.png";
import { PetMeetingContext } from "../../context/PetMeetingContext.jsx";

const SetLocation = () => {
    const { view, setView } = useContext(PetMeetingContext);

    useEffect(() => {
        console.log("view changed to:", view);
    }, [view]);

    return (
        <Box
            sx={{
                borderRadius: "10px",
                border: "2px solid rgba(0, 0, 0, 0.3)",
                width: "100%",
                height: "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                cursor: "pointer",
            }}
            onClick={() => {
                setView("locationConfig");
                console.log("onClick view change:", view);
            }}
        >
            <Typography
                sx={{
                    position: "absolute", // 아이콘 위에 배치
                    top: "33%", // 조정 가능
                    transform: "translateY(-50%)", // 중앙 정렬
                }}
            >
                위치를 설정해주세요.
            </Typography>
            <Box
                component="img"
                src={Plus}
                alt="추가"
                sx={{
                    width: "48px",
                    height: "48px",
                }}
            ></Box>
        </Box>
    );
};

export default SetLocation;
