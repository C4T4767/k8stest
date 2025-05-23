import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import mockPetsitters from "../../mock/Sitter/petsitters.json"; // 임시 데이터 import

// 새로 분리한 컴포넌트 import
import PetSitterSurvey from "../../components/Sitter/PetSitterSurvey";
import PetSitterResults from "../../components/Sitter/PetSitterResults";

const PetSitterFinder = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(0);
    const [showResults, setShowResults] = useState(false);

    // 사용자 응답 저장
    const [selectedAges, setSelectedAges] = useState({
        "20대": false,
        "30대": false,
        "40대": false,
        "50대이상": false,
    });

    const [hasPet, setHasPet] = useState({
        네: false,
        아니오: false,
        상관없어요: false,
    });

    const [hasSitterExperience, setHasSitterExperience] = useState({
        네: false,
        아니오: false,
        상관없어요: false,
    });

    // 필터링된 펫시터 목록
    const [filteredPetsitters, setFilteredPetsitters] = useState([]);

    // 진행률 매핑
    const progressMapping = {
        1: 0, // 첫 번째 질문
        2: 35, // 두 번째 질문
        3: 70, // 세 번째 질문
        4: 100, // 완료
    };

    // 사용자 응답 표시
    const [history, setHistory] = useState([]);

    // 단계에 따른 진행률 업데이트
    useEffect(() => {
        setProgress(progressMapping[step] || 0);
    }, [step]);

    const handleNext = () => {
        switch (step) {
            case 1: // 연령대 선택 후
                if (!Object.values(selectedAges).some((v) => v)) {
                    alert("연령대를 하나 이상 선택해주세요.");
                    return;
                }

                const selectedAgeList = Object.keys(selectedAges).filter((age) => selectedAges[age]);
                setHistory([
                    ...history,
                    { question: "원하는 펫시터님의 연령대를 골라주세요", answer: selectedAgeList[0] },
                ]);

                setStep(2);
                break;

            case 2: // 반려동물 여부 선택 후
                if (!Object.values(hasPet).some((v) => v)) {
                    alert("선택지를 하나 선택해주세요.");
                    return;
                }

                const hasPetAnswer = Object.keys(hasPet).find((opt) => hasPet[opt]);
                setHistory([...history, { question: "반려동물을 키우고 있는 분을 찾을까요?", answer: hasPetAnswer }]);

                setStep(3);
                break;

            case 3: // 펫시터 경험 여부 선택 후
                if (!Object.values(hasSitterExperience).some((v) => v)) {
                    alert("선택지를 하나 선택해주세요.");
                    return;
                }

                const hasExpAnswer = Object.keys(hasSitterExperience).find((opt) => hasSitterExperience[opt]);
                setHistory([...history, { question: "임시보호 경험이 있으신 분을 찾으시나요?", answer: hasExpAnswer }]);

                setStep(4);
                break;

            case 4: // 완료 시 결과 표시
                // 선택된 조건으로 펫시터 필터링
                filterPetsitters();
                setShowResults(true);
                break;
        }
    };

    // 펫시터 필터링 함수
    const filterPetsitters = () => {
        // 선택된 옵션 추출
        const selectedAge = Object.keys(selectedAges).find((age) => selectedAges[age]);
        const wantsPetOwner = hasPet["네"];
        const wantsExperienced = hasSitterExperience["네"];

        // 필터링 로직
        let filtered = [...mockPetsitters];

        // 연령대 필터링
        if (selectedAge) {
            filtered = filtered.filter((sitter) => sitter.age === selectedAge);
        }

        // 반려동물 소유 여부 필터링 (상관없어요는 필터링 안함)
        if (wantsPetOwner) {
            filtered = filtered.filter((sitter) => sitter.pet_count > 0);
        } else if (hasPet["아니오"]) {
            filtered = filtered.filter((sitter) => sitter.pet_count === 0);
        }

        // 경험 여부 필터링 (상관없어요는 필터링 안함)
        if (wantsExperienced) {
            filtered = filtered.filter((sitter) => sitter.experience);
        } else if (hasSitterExperience["아니오"]) {
            filtered = filtered.filter((sitter) => !sitter.experience);
        }

        setFilteredPetsitters(filtered);
    };

    // 뒤로가기 처리
    const handleBack = () => {
        if (showResults) {
            setShowResults(false);
        } else if (step > 1) {
            setStep(step - 1);
            // 히스토리에서 마지막 항목 제거
            setHistory(history.slice(0, -1));
        } else {
            navigate(-1);
        }
    };

    return (
        <Box
            sx={{
                p: 2,
                height: "100vh",
                overflow: "hidden",
                bgcolor: "white",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* 헤더 */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                    pb: 1,
                    borderBottom: "1px solid #f0f0f0",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={handleBack} sx={{ p: 0, mr: 1 }}>
                        <ArrowBackIosNewIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="h6" component="h1" fontWeight="bold" color="#363636" fontSize="18px">
                        펫시터 요청
                    </Typography>
                </Box>
            </Box>

            {/* 진행 표시 바 */}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        bgcolor: "#e0e0e0",
                        height: "4px",
                        borderRadius: "2px",
                        position: "relative",
                    }}
                >
                    <Box
                        sx={{
                            width: `${progress}%`,
                            bgcolor: "#E9A260",
                            height: "100%",
                            borderRadius: "2px",
                        }}
                    />
                </Box>
                <Typography
                    sx={{
                        ml: 1,
                        color: "#E9A260",
                        fontWeight: "bold",
                    }}
                >
                    {Math.round(progress)}%
                </Typography>
            </Box>

            {/* 대화 내용 */}
            <Box
                sx={{
                    flex: 1,
                    overflow: "auto",
                    mb: 2,
                }}
            >
                {showResults ? (
                    // 결과 화면 - PetSitterResults 컴포넌트 사용
                    <PetSitterResults filteredPetsitters={filteredPetsitters} />
                ) : (
                    // 질문 화면 - PetSitterSurvey 컴포넌트 사용
                    <PetSitterSurvey
                        step={step}
                        history={history}
                        selectedAges={selectedAges}
                        setSelectedAges={setSelectedAges}
                        hasPet={hasPet}
                        setHasPet={setHasPet}
                        hasSitterExperience={hasSitterExperience}
                        setHasSitterExperience={setHasSitterExperience}
                        handleNext={handleNext}
                    />
                )}
            </Box>
        </Box>
    );
};

export default PetSitterFinder;
