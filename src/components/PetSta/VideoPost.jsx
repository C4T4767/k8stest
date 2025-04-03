import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import PostProfile from "./PostProfile.jsx";
import PostBottom from "./PostBottom.jsx";
import VideoPlayer from "./VideoPlayer.jsx";

const VideoPost = ({ post_id, user_name, user_id, user_photo, file_name, likes, comments, content, created_at }) => {
    const [isWide, setIsWide] = useState(false); // 화면이 넓은지

    // 🔹 useMemo를 사용하여 isWide 계산 (렌더링 최소화)
    useEffect(() => {
        if (file_name) {
            const video = document.createElement("video");
            video.src = "./mock/PetSta/videos/" + file_name; // 파일 경로 또는 URL을 사용
            video.onloadedmetadata = () => {
                const videoWidth = video.videoWidth;
                const videoHeight = video.videoHeight;
                const ratio = 599 / 565; // 가로/세로 비율
                const videoRatio = videoWidth / videoHeight;
                // 비디오가 가로로 더 넓으면 true, 그렇지 않으면 false
                setIsWide(videoRatio > ratio);
            };
        }
    }, [file_name]);

    return (
        <Box
            sx={{
                width: "100%",
                maxHeight: "100vh",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {isWide ? (
                    <div style={{ position: "relative", width: "100%" }}>
                        <VideoPlayer file_name={file_name} isWide={true} post_id={post_id} />
                        {/* 프로필 이미지와 사용자 이름 */}
                        <PostProfile
                            user_id={user_id}
                            user_name={user_name}
                            user_photo={user_photo}
                            isAbsolute={true}
                        />
                    </div>
                ) : (
                    <div style={{ position: "relative", width: "100%" }}>
                        <PostProfile user_name={user_name} user_id={user_id} user_photo={user_photo} />
                        <Box
                            sx={{
                                background: "black",
                                height: "70vh",
                                boxSizing: "border-box",
                            }}
                        >
                            <VideoPlayer file_name={file_name} post_id={post_id} />
                        </Box>
                        {/* 프로필 이미지와 사용자 이름 */}
                    </div>
                )}
            </Box>
            <PostBottom
                post_id={post_id}
                user_name={user_name}
                content={content}
                created_at={created_at}
                comments={comments}
                likes={likes}
            />
        </Box>
    );
};

export default VideoPost;
