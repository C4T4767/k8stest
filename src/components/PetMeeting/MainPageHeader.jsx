import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import chatLogo from "../../assets/images/Global/comment.svg";
import { Box, Typography } from "@mui/material";
import { PetMeetingContext } from "../../context/PetMeetingContext.jsx";

const MainPageHeader = () => {
    const navigate = useNavigate();
    const { pet } = useContext(PetMeetingContext);

    return (
        <Box
            sx={{
                padding: "15px 5px",
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
                borderBottom: "1px solid #ccc",
            }}
        >
            <Box sx={{ flex: 1 }}>
                <Typography variant="h5">{pet?.name} 동네친구들</Typography>
                <Typography variant="caption">8시, 12시, 18시마다 새로운 친구를 만나보아요</Typography>
            </Box>
            <Box
                sx={{
                    padding: "3px 25px",
                    border: "2px solid #ccc",
                    borderRadius: 10,
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f0f0f0" }, // 호버 효과 추가
                    boxSizing: "border-box",
                    opacity: 0.5,
                }}
                onClick={() => navigate("/chat")}
            >
                <Box
                    component="img"
                    src={chatLogo}
                    alt="Comment Icon"
                    sx={{
                        width: "35px",
                        height: "35px",
                        objectFit: "cover", // 이미지 비율 유지
                    }}
                />
            </Box>
        </Box>
    );
};

export default MainPageHeader;
