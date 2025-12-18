import React, { useState, useEffect } from 'react';
import { ArrowRightIcon, ClockIcon, Lightbulb, TrendingUp } from "lucide-react";
import { useAuth } from '../../contexts/AuthContext';
import { insightsAPI } from '../../services/api'; 

const decorativeQuoteLogos = [
    { top: "top-[0%]", left: "left-[0%]", rotation: "" }, 
    { top: "top-[75%]", left: "left-[5%]", rotation: "" }, 
    { top: "top-[10%]", left: "right-[0%]", rotation: "" }, 
    { top: "top-[70%]", left: "right-[5%]", rotation: "" }, 
];

export const Card = ({ className = "", children }) => (
    <div className={`rounded-xl border border-gray-200 bg-white text-gray-900 shadow-md ${className}`}>
        {children}
    </div>
);

export const CardHeader = ({ className = "", children }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
        {children}
    </div>
);

export const CardTitle = ({ className = "", children }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
        {children}
    </h3>
);

export const CardContent = ({ className = "", children }) => (
    <div className={`p-6 pt-0 ${className}`}>
        {children}
    </div>
);

// Modal Components
const ModalCloseButton = ({ onClose }) => (
    <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-white hover:text-gray-200 z-10"
    >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
);

// 1. ActiveTimeDetailModal
const ActiveTimeDetailModal = ({ isOpen, onClose, data }) => {
    if (!isOpen || !data) return null;

    const { 
        activeTime,  
        timeRange,  
        description,
        learnerType,
    } = data;
    
    const label = "Most Active Time";
    const defaultPlaceholderImage = "https://placehold.co/150x150/FFC107/000000?text=PRIME+TIME";

    const getImageSource = (time) => {
        const normalizedTime = time.toUpperCase().replace(/\s/g, '_');
        switch (normalizedTime) {
            case 'MORNING':
                return "/images/most_active_time/morning_learner.png";
            case 'AFTERNOON':
                return "/images/most_active_time/afternoon_learner.png";
            case 'LATE_NIGHT':
            case 'NIGHT':
                return "/images/most_active_time/late_night_warrior.png"; 
            case 'EVENING':
            default:
                return "/images/most_active_time/evening_learner.png"; 
        }
    };
    
    const imageSource = getImageSource(activeTime);

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-0 overflow-hidden bg-white shadow-xl rounded-[32px] !border-0"> 
                <CardHeader className="p-0">
                    <div className="relative p-6 bg-gradient-to-br from-[#0d1c31] to-[#1a3a5a]">
                        <ModalCloseButton onClose={onClose} />
                        <div className="flex items-center justify-center gap-4 text-white">
                            <ClockIcon className="w-8 h-8 flex-shrink-0" />
                            <h3 className="text-xl font-bold">{label}</h3>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="text-center mb-6">
                        <p className="text-sm text-gray-700 italic mb-3">
                            Setiap orang punya waktu emas untuk belajar. Dan waktu terbaikmu adalah....
                        </p>
                        <h4 className="text-2xl font-extrabold text-[#1a3a5a] mb-6">
                            {activeTime?.toUpperCase() || 'MORNING'} {timeRange ? `(${timeRange})` : ''}
                        </h4>
                        
                        <div className="w-full flex justify-center mb-6">
                            <img 
                                src={imageSource} 
                                alt={`${learnerType} Illustration`}
                                className="w-32 h-32 object-contain"
                                onError={(e) => { e.target.onerror = null; e.target.src = defaultPlaceholderImage; }}
                            />
                        </div>

                        <h5 className="text-xl font-bold text-gray-900 mb-3">
                             {learnerType || 'Learner'} 
                        </h5>
                        <p className="text-sm text-gray-800 leading-relaxed mb-8"> 
                            {description || 'Waktu terbaik untuk belajar adalah saat kamu merasa paling fokus dan produktif.'} 
                        </p>
                    </div>
                    
                    <div className="flex justify-center">
                        <Button 
                            onClick={onClose} 
                            className="w-40 py-2 px-6 bg-[#1a3a5a] hover:bg-[#254C75] text-white text-base font-semibold"
                        >
                            Tutup
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// 2. LearningPatternDetailModal
const LearningPatternDetailModal = ({ isOpen, onClose, data }) => {
    if (!isOpen || !data) return null;

    const { 
        patternType,
        description, 
    } = data;
    
    const topLabel = "Learning Pattern"; 
    const introText = "Setiap orang punya cara belajar yang berbeda. Pola yang paling mencerminkan gaya belajarmu adalah....";
    const defaultPlaceholderImage = "https://placehold.co/150x150/50C878/FFFFFF?text=PATTERN";

    const getImageSource = (type) => {
        const normalizedType = type.toUpperCase().replace(/\s/g, '_');
        
        switch (normalizedType) {
            case 'CONSISTENT_LEARNER':
                return "/images/consistency_score/consistent_learner.png"; 
            case 'FAST_LEARNER':
                return "/images/consistency_score/fast_learner.png"; 
            case 'REFLECTIVE_LEARNER':
                return "/images/consistency_score/reflective_learner.png";
            default:
                return "/images/consistency_score/reflective_learner.png"; 
        }
    };
    
    const imagePath = getImageSource(patternType);

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-0 overflow-hidden bg-white shadow-xl rounded-[32px] !border-0">
                <CardHeader className="p-0">
                    <div className="relative p-6 bg-gradient-to-br from-[#0d1c31] to-[#1a3a5a]"> 
                        <ModalCloseButton onClose={onClose} />
                        <div className="flex items-center justify-center gap-4 text-white">
                            <Lightbulb className="w-8 h-8 flex-shrink-0" /> 
                            <h3 className="text-xl font-bold">{topLabel}</h3>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="text-center mb-6">
                        <p className="text-sm text-gray-700 italic mb-3">
                            {introText}
                        </p>
                        
                        <div className="w-full flex justify-center mb-6">
                            <img 
                                src={imagePath}
                                alt={`${patternType} Illustration`}
                                className="w-32 h-32 object-contain" 
                                onError={(e) => { e.target.onerror = null; e.target.src = defaultPlaceholderImage; }}
                            />
                        </div>

                        <h5 className="text-xl font-bold text-gray-900 mb-3">
                            {patternType || 'Reflective Learner'}
                        </h5>
                        <p className="text-sm text-gray-800 leading-relaxed mb-8"> 
                            {description || 'Pola belajar yang mencerminkan gaya belajarmu.'}
                        </p>

                    </div>
                    
                    <div className="flex justify-center mt-6">
                        <Button 
                            onClick={onClose} 
                            className="w-40 py-2 px-6 bg-[#1a3a5a] hover:bg-[#254C75] text-white text-base font-semibold"
                        >
                            Tutup
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// 3. ConsistencyDetailModal
const ConsistencyDetailModal = ({ isOpen, onClose, data }) => {
    if (!isOpen || !data) return null;

    const { 
        consistencyLevel, 
        description,      
        scoreValue        
    } = data;
    
    const topLabel = "Detail Konsistensi"; 
    const scoreText = "YOUR CONSISTENCY SCORE IS..."; 
    const learnerType = "The Consistent Learner"; 
    const introText = "Konsistensi adalah kunci kesuksesan belajar. Skor konsistensimu menunjukkan seberapa rutin kamu belajar.";
    const defaultPlaceholderImage = "https://placehold.co/150x150/283e75/FFF?text=CONSISTENCY";
    
    const getImageSource = (level) => {
        const normalizedLevel = level.toUpperCase();

        switch (normalizedLevel) {
            case 'LOW':
                return "/images/learning_pattern/low_consistency.png"; 
            case 'MEDIUM':
                return "/images/learning_pattern/medium_consistency.png"; 
            case 'HIGH':
            default:
                return "/images/learning_pattern/hight_consistency.png"; 
        }
    };
    
    const imagePath = getImageSource(consistencyLevel);
    const statusLabel = consistencyLevel ? consistencyLevel.toUpperCase() + " Consistency" : "HIGH Consistency";

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-0 overflow-hidden bg-white shadow-xl rounded-[32px] !border-none">
                <CardHeader className="p-0">
                    <div className="relative p-6 bg-gradient-to-br from-[#0d1c31] to-[#1a3a5a]"> 
                        <ModalCloseButton onClose={onClose} />
                        <div className="flex items-center justify-center gap-4 text-white">
                            <TrendingUp className="w-8 h-8 flex-shrink-0" />
                            <h3 className="text-xl font-bold">{topLabel}</h3>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="text-center mb-2">
                        <p className="text-sm text-gray-700 italic mb-3">
                            {introText}
                        </p>
                        
                        <h4 className="text-xl font-extrabold text-[#1a3a5a] mb-3"> 
                            {scoreText.toUpperCase()}
                        </h4>
                        
                        <p className="text-3xl font-bold text-[#283e75] mb-4">
                            {statusLabel} {scoreValue !== undefined ? `(${scoreValue}%)` : ''}
                        </p>

                        <div className="w-full flex justify-center mb-3">
                            <img 
                                src={imagePath} 
                                alt={`${statusLabel} Illustration`}
                                className="w-32 h-32 object-contain" 
                                onError={(e) => { e.target.onerror = null; e.target.src = defaultPlaceholderImage; }}
                            />
                        </div>

                        <h5 className="text-xl font-bold text-gray-900 mb-3">
                            {learnerType}
                        </h5>
                    
                        <p className="text-sm text-gray-800 leading-relaxed mb-8">
                            {description || 'Konsistensi adalah kunci untuk mencapai tujuan belajarmu.'} 
                        </p>

                    </div>
                
                    <div className="flex justify-center mt-6">
                        <Button 
                            onClick={onClose} 
                            className="w-40 py-2 px-6 bg-[#1a3a5a] hover:bg-[#254C75] text-white text-base font-semibold"
                        >
                            Tutup
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

const Button = ({ className = "", children, onClick, variant = 'primary' }) => {
    let baseClasses = `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors 
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
                disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2`;
    
    let variantClasses = 'bg-[#1a3a5a] text-white hover:bg-[#254C75] focus-visible:ring-[#254C75]';
    
    if (variant === 'secondary') {
        variantClasses = 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus-visible:ring-gray-300';
    }

    return (
        <button 
            onClick={onClick} 
            className={`${baseClasses} ${variantClasses} ${className}`}
        >
            {children}
        </button>
    );
};

// AI LEARNING INSIGHT PAGE

// 1. ConsistencyScoreSection 
// Component ini menerima data dari backend melalui props
// Data diambil dari backend API: GET /api/insights/:userId
// Data flow:
//   1. Frame component fetch dari backend: insightsAPI.getCurrentInsights(userId)
//   2. Transform data: transformInsightsData(insightsData, user)
//   3. Pass ke component: finalUserData.consistency_score (dari backend)
// Props:
//   - score: consistencyScore dari backend insights API (insightsData.consistencyScore)
//   - insight: description dari backend insights API (calculated based on score)
//   - insightText: insights text dari backend insights API (insightsData.insights)
//   - onShowDetail: handler untuk membuka modal detail
const ConsistencyScoreSection = ({ score = 0, level = 'HIGH', insight = 'Data konsistensi belum tersedia.', insightText = 'Ayo tingkatkan konsistensi belajarmu!', onShowDetail }) => {
    // score berasal dari backend: insightsData.consistencyScore
    // Pastikan score adalah number dan dalam range 0-100
    const numericScore = typeof score === 'number' ? score : parseFloat(score || 0);
    const normalizedScore = Math.max(0, Math.min(100, numericScore)); // Clamp antara 0-100
    
    // Format score untuk display (1 desimal)
    const displayScore = normalizedScore.toFixed(1);
    
    // angle dihitung dari score: score * 3.6 (untuk circular progress)
    // 100% = 360 derajat, jadi 1% = 3.6 derajat
    const chartColor = '#283e75'; 
    const backgroundColor = '#e0e0e0'; 
    const angle = normalizedScore * 3.6;
    
    console.log('[ConsistencyScoreSection] Received score from backend:', score);
    console.log('[ConsistencyScoreSection] Normalized score:', normalizedScore);
    console.log('[ConsistencyScoreSection] Consistency level:', level);
    
    return (
        <section className="w-full py-4 lg:py-8">
            <Card className="w-full bg-[#fff6f6] rounded-xl lg:rounded-[32px] shadow-xl border-0">  
                <CardContent className="p-6 lg:p-8"> 
                    <div className="mb-4 lg:mb-6 text-center lg:text-left"> 
                        <h2 className="font-['Inter',Helvetica] font-semibold text-xl lg:text-2xl text-black mb-1"> 
                            Consistency Score
                        </h2>
                        <p className="font-['Open_Sans',Helvetica] font-normal text-xs lg:text-sm text-black max-w-2xl"> 
                            Ketahui seberapa rutin kamu belajar dan ayo tingkatkan konsistensimu perlahan
                        </p>
                    </div>
                        
                    <hr className="mb-4 lg:mb-6 border-t border-gray-300" /> 
                        
                    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-12"> 
                        <div className="flex flex-col items-center flex-shrink-0">
                            <h3 className="font-['Inter',Helvetica] font-semibold text-base lg:text-xl text-center mb-3 text-[#0d1c31]"> 
                                Skor Konsistensi Anda
                            </h3>
                            <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full flex items-center justify-center mb-3"> 
                                <div
                                    className="w-full h-full rounded-full"
                                    style={{
                                        background: `conic-gradient(${chartColor} ${angle}deg, ${backgroundColor} 0deg)`,
                                        boxShadow: `0 0 8px rgba(0, 0, 0, 0.1)`,
                                    }}
                                >
                                </div>
                                
                        <div className="absolute inset-0 m-auto w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-[#fff6f6] flex items-center justify-center shadow-inner"> 
                            <span className="font-bold text-3xl lg:text-4xl text-[#0d1c31]"> 
                                {displayScore}
                                <small className="text-lg">%</small> 
                            </span>
                        </div>
                            </div>
                            <p className="font-['Open_Sans',Helvetica] font-normal text-xs lg:text-sm text-black/80 max-w-[200px] text-center italic"> 
                                "{insightText}"
                            </p>
                        </div>
                        
                        <div className="w-full lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                            <h3 className="font-['Inter',Helvetica] font-semibold text-base lg:text-xl text-black mb-3 hidden lg:block"> 
                                Tingkatkan Konsistensi
                            </h3>
                            <p className="font-['Open_Sans',Helvetica] font-normal text-sm lg:text-base text-black/90 leading-relaxed mb-4 lg:mb-6"> 
                                {insight}
                                Pelajari lebih lanjut tips dan trik untuk mempertahankan momentum belajarmu!
                            </p>

                            <Button 
                                onClick={() => {
                                    onShowDetail?.({
                                        consistencyLevel: level,
                                        description: insight,
                                        scoreValue: normalizedScore
                                    });
                                }}
                                className="bg-[#283e75] hover:bg-[#1f3160] rounded-full h-8 lg:h-10 px-6 gap-1"
                            > 
                                <span className="font-['Open_Sans',Helvetica] font-normal text-[#fff6f6] text-xs lg:text-sm tracking-[0] leading-[normal]">
                                    SELENGKAPNYA
                                </span>
                            </Button>
                        </div>
                    </div>
                    
                </CardContent>
            </Card>
        </section>
    );
};


// 2. MostActiveTimeSection 
const MostActiveTimeSection = ({ timeData = [], insightText = 'Optimalkan jam fokus terbaikmu!', onShowDetail, mostActiveTimeData = null }) => {
    
    const mapTimeToColor = (data) => {
        return data.map(time => {
            const timeLabel = time.label.toLowerCase();
            let colorClass = 'bg-gray-400'; 

            if (timeLabel.includes('morning')) {
                colorClass = 'bg-amber-400'; 
            } else if (timeLabel.includes('afternoon')) {
                colorClass = 'bg-blue-400'; 
            } else if (timeLabel.includes('evening') || timeLabel.includes('night')) {
                colorClass = 'bg-indigo-700';
            }
            
            return {
                ...time,
                color: colorClass 
            };
        });
    };

    const coloredTimeData = mapTimeToColor(timeData);
    const hasActualData = coloredTimeData.some(time => time.fillPercentage > 0);

    // insight yang mengandung persentase 
    const getActiveTimeInsight = (data, baseInsight) => {
        if (!hasActualData) return 'Belum ada data waktu produktif yang terekam.';
        
        const mostActive = data.reduce((prev, current) => 
          (prev.fillPercentage > current.fillPercentage) ? prev : current
        );
        const finalInsight = baseInsight.replace(
            /Manfaatkan waktu ini untuk materi yang paling menantang!/, 
            `Kamu memiliki tingkat aktivitas ${mostActive.fillPercentage}% di waktu ini. Manfaatkan waktu ini untuk materi yang paling menantang!`
        );
        return `Waktu belajarmu yang paling produktif adalah ${mostActive.label.split('(')[0].trim()}. ${finalInsight}`;
    };

    const finalInsight = getActiveTimeInsight(coloredTimeData, insightText); 

    return (
        <section className="relative w-full">
            <Card className="bg-[#fff6f6] rounded-3xl lg:rounded-[58px] shadow-xl border-0">
                <CardContent className="p-0">
                    <div className="p-6 lg:p-8"> 
                        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between mb-4 lg:mb-6 gap-3">
                            <div className="flex-1 order-2 lg:order-1 text-center lg:text-left">
                                <h2 className="font-['Inter',Helvetica] font-semibold text-xl lg:text-2xl text-black mb-1">
                                    Most Active Time
                                </h2>
                                <p className="font-['Open_Sans',Helvetica] font-normal text-xs lg:text-sm text-black max-w-2xl">
                                    Kenali pola waktu belajarmu dan optimalkan jam fokus terbaikmu
                                </p>
                            </div>
                            <ClockIcon
                                className="w-12 h-12 lg:w-16 lg:h-16 text-black flex-shrink-0 order-1 lg:order-2"
                                strokeWidth={1.5}
                            />
                        </div>

                        <hr className="mb-4 lg:mb-6 border-t border-gray-300" /> 
                        
                        <Card className="bg-[#fff6f6] rounded-xl lg:rounded-[58px] shadow-lg border-0 mb-4 lg:mb-6">
                            <CardContent className="p-3 lg:p-4">
                                <div className="relative h-32 lg:h-40 w-full flex items-end justify-around"> 
                                    {coloredTimeData.map((time, index) => ( 
                                        <div
                                            key={index}
                                            className="flex flex-col items-center gap-1 w-1/4 max-w-[80px] h-full"
                                        >
                                            <div className="w-full h-full border border-solid border-black/30 rounded-lg shadow-inner relative overflow-hidden bg-gray-200/50">
                                                <div 
                                                    className={`absolute bottom-0 w-full ${time.color} transition-all duration-500 hover:opacity-80`}
                                                    style={{ height: `${time.fillPercentage}%` }}
                                                >
                                                </div>
                                            </div>
                                            <span className="font-['Open_Sans',Helvetica] font-normal text-xs lg:text-sm text-black tracking-[0] leading-[normal] text-center">
                                                {time.label.split('(')[0].trim()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Ringkasan & Tombol */}
                        <Card className="bg-[#fff6f6] rounded-xl lg:rounded-[58px] shadow-lg border-0">
                            <CardContent className="p-3 lg:p-4">
                                <div className="relative text-center">
                                    <p 
                                        className="font-['Inter',Helvetica] font-normal text-xs lg:text-base text-black tracking-[0] leading-normal mb-3 lg:mb-4"
                                        dangerouslySetInnerHTML={{ __html: finalInsight }}
                                    />
                                    
                                    {hasActualData && (
                                        <Button 
                                            onClick={() => {
                                                const mostActive = coloredTimeData.reduce((prev, current) => 
                                                    (prev.fillPercentage > current.fillPercentage) ? prev : current
                                                );
                                                
                                                const labelParts = mostActive.label.match(/(.*)\s\((.*)\)/) || [null, mostActive.label, 'N/A'];
                                                
                                                onShowDetail?.({
                                                    activeTime: labelParts[1]?.trim() || mostActive.label.split('(')[0].trim() || 'Morning',
                                                    timeRange: labelParts[2]?.replace(')', '').trim() || '06:00-11:59',
                                                    description: mostActive.description || mostActiveTimeData?.detailDescription || 'Waktu terbaik untuk belajar adalah saat kamu merasa paling fokus dan produktif.',
                                                    learnerType: mostActive.learnerType || mostActiveTimeData?.learnerType || 'Learner'
                                                });
                                            }}
                                            className="bg-[#283e75] hover:bg-[#283e75]/90 rounded-full h-8 lg:h-10 px-6 lg:px-8 gap-1"
                                        >
                                            <span className="font-['Open_Sans',Helvetica] font-normal text-[#fff6f6] text-xs lg:text-sm tracking-[0] leading-[normal]">
                                                SELENGKAPNYA
                                            </span>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};
// 3. LearningPatternSection 
const generateConicGradient = (data) => {
    let gradientString = 'conic-gradient(';
    let currentAngle = 0;
    
    data.forEach((item, index) => {
        const angle = item.percentage * 3.6;
        const endAngle = currentAngle + angle;
        
        gradientString += `${item.color} ${currentAngle}deg ${endAngle}deg${index < data.length - 1 ? ',' : ''}`;
        currentAngle = endAngle;
    });
    
    gradientString += ')';
    return gradientString;
};


const LearningPatternSection = ({ learningPatternData = [], mainPattern = { label: "N/A" }, description = 'Pola belajar belum terdeteksi.', onShowDetail }) => {
    
    // Fallback jika data kosong
    const dataToDisplay = learningPatternData.length > 0 ? learningPatternData : [
        { label: "Data not available", percentage: 0, color: "#ccc" }
    ];

    const hasActualData = dataToDisplay.some(item => item.percentage > 0);

    const pieChartStyle = {
        background: !hasActualData ? '#e0e0e0' : generateConicGradient(dataToDisplay),
    };

    return (
        <section className="w-full py-8 px-6">
            
            <div className="mb-8 text-left">
                <h2 className="font-['Inter',Helvetica] font-bold text-2xl text-black mb-1.5">
                    Learning Pattern
                </h2>
                <p className="font-['Open_Sans',Helvetica] font-normal text-base text-black/70">
                    Temukan kategori yang mencerminkan caramu belajar.
                </p>
            </div>
                
            <div className="flex flex-col lg:flex-row items-center gap-10 mb-8">
                <div className="flex items-center gap-6 w-fit lg:w-auto">
                    <div className="flex-shrink-0 relative w-32 h-32 rounded-full overflow-hidden shadow-xl flex items-center justify-center bg-gray-100">
                        <div
                            className="w-full h-full"
                            style={pieChartStyle}
                        >
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3 w-max"> 
                        {dataToDisplay.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span 
                                    className="w-4 h-4 rounded-sm flex-shrink-0"
                                    style={{ backgroundColor: item.color }}
                                ></span>
                                <span className="font-['Open_Sans',Helvetica] font-medium text-sm lg:text-base text-black/90 whitespace-nowrap">
                                    {item.label} {item.percentage !== undefined ? `(${item.percentage}%)` : ''}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pola Belajar Utama */}
                <div className="text-center w-full lg:text-left lg:w-auto flex-shrink-0">
                    <p className="font-['Inter',Helvetica] font-semibold text-base text-black/70 mb-1">Pola Belajar Utama:</p>
                    <h3 className="font-['Inter',Helvetica] font-bold text-2xl text-[#0d1c31]">
                        {hasActualData ? mainPattern.label : '-'}
                    </h3>
                </div>
            </div>
                
            {/* Ringkasan & Tombol */}
            <div className="relative pt-6 text-center border-t border-black/10"> 
                <p className="font-['Inter',Helvetica] font-normal text-sm lg:text-base text-black/80 tracking-[0] leading-normal mb-6 max-w-2xl mx-auto">
                    {hasActualData ? description : 'Mulai aktivitas belajarmu untuk melihat analisis pola belajarmu di sini.'}
                </p>
                    
                {hasActualData && (
                    <Button 
                        onClick={() => {
                            onShowDetail?.({
                                patternType: mainPattern.label || 'Reflective Learner',
                                description: description
                            });
                        }}
                        className="bg-[#283e75] hover:bg-[#1f3160] rounded-full h-9 px-7 gap-1.5"
                    >
                        <span className="font-['Open_Sans',Helvetica] font-normal text-[#fff6f6] text-sm lg:text-base tracking-[0] leading-[normal]">
                            SELENGKAPNYA
                        </span>
                    </Button>
                )}
            </div>
        </section>
    );
};


// 4. ConsistentLearnerSection (Quote Section) 
const ConsistentLearnerSection = () => {
    const logoColor = "#25586e";
    const bgColor = "#fcf9f2";
    const shadowSize = '5px'; 
    const finalShadow = `0 0 0 ${shadowSize} ${bgColor}, 0 0 0 ${parseInt(shadowSize) + 1}px ${logoColor}`;

    return (
        <div className="w-full overflow-hidden" style={{ backgroundColor: bgColor }}> 
            <div className="relative py-12 lg:py-20 max-w-5xl mx-auto px-4 lg:px-8">
                {decorativeQuoteLogos.map((logo, index) => (
                    <div 
                        key={index} 
                        className={`hidden lg:block absolute ${logo.top} ${logo.left} w-20 h-20`}
                        style={{ zIndex: 1 }}
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div 
                                className={`w-full h-full rounded-full flex items-center justify-center`}
                                style={{
                                    backgroundColor: logoColor,
                                    boxShadow: finalShadow,
                                }}
                            >
                                <span className="text-white font-serif text-4xl leading-none font-bold">g</span>
                            </div>
                        </div>
                    </div>
                ))}
                
                <section 
                    className={`font-['Open_Sans',Helvetica] font-semibold text-lg lg:text-xl tracking-[0] leading-normal text-center max-w-[884px] mx-auto relative z-20`}
                    style={{ lineHeight: '1.5', color: logoColor }}
                >
                    "Hasil yang luar biasa datang bukan dari tindakan yang besar, tetapi dari konsistensi tindakan-tindakan kecil."
                </section>
                <div 
                    className={`font-['Inter',Helvetica] font-semibold text-sm lg:text-base text-center mt-8 relative z-20`}
                    style={{ color: logoColor }}
                >
                    – Thompson Abbot -
                </div>
                
            </div>
            <div className="w-full h-12 lg:h-16 bg-[#25586e]" /> 
        </div>
    );
};

// HELPER FUNCTION

const getMainPattern = (data) => {
    if (!data || data.length === 0) return { label: "N/A", percentage: 0 };
    return data.reduce((prev, current) => 
        (prev.percentage > current.percentage) ? prev : current
    );
};


// Transform backend data to frontend format
const transformInsightsData = (insightsData, user) => {
    // Selalu proses data, jika tidak ada insightsData maka gunakan default object kosong
    const data = insightsData || {};
    
    // hasData dianggap benar jika ada aktivitas nyata ATAU ada data dari JSON
    const hasData = (data.totalActivities > 0) || (data.consistencyScore > 0) || !!data.jsonInsight;

    const jsonInsight = data.jsonInsight;

    // Map mostActiveTime to time distribution
    const timeMap = {
        'morning': { label: 'Morning (06:00-11:59)', index: 0 },
        'afternoon': { label: 'Afternoon (12:00-17:59)', index: 1 },
        'evening': { label: 'Evening (18:00-23:59)', index: 2 },
        'night': { label: 'Night (00:00-05:59)', index: 3 }
    };

    // 1. Most Active Time - Prioritize JSON
    let mostActiveTime = (data.mostActiveTime || 'morning').toLowerCase();
    if (jsonInsight && jsonInsight.most_active_time) {
        mostActiveTime = jsonInsight.most_active_time.period.toLowerCase();
    }
    
    const timeInfo = timeMap[mostActiveTime] || timeMap['morning'];

    // 2. Consistency Score - Prioritize matching JSON Category
    let consistencyScore = 0;
    if (data.consistencyScore !== undefined && data.consistencyScore !== null) {
        const parsedScore = Number(data.consistencyScore);
        if (!isNaN(parsedScore)) {
            consistencyScore = parsedScore;
        }
    }

    if (jsonInsight && jsonInsight.consistency) {
        console.log(`[transformInsightsData] Using dynamic ML score: ${consistencyScore} for category: ${jsonInsight.consistency.category}`);
    }
    
    // 3. Learning Pattern - Prioritize JSON
    let learningPattern = data.learningPattern || 'Reflective Learner';
    if (jsonInsight && jsonInsight.learning_pattern) {
        learningPattern = jsonInsight.learning_pattern.name;
    }

    console.log('[transformInsightsData] Data Source:', jsonInsight ? 'user_insights.json' : (hasData ? 'ML Model' : 'Default/No Data'));
    console.log('[transformInsightsData] - consistencyScore:', consistencyScore);
    console.log('[transformInsightsData] - learningPattern:', learningPattern);
    console.log('[transformInsightsData] - mostActiveTime:', mostActiveTime);
    
    // Learner type mapping
    const learnerTypeMap = {
        'morning': 'Morning Learner',
        'afternoon': 'Afternoon Learner',
        'evening': 'Evening Learner',
        'night': 'Night Learner',
        'late_night': 'Late Night Warrior'
    };
    
    // Description mapping (defaults)
    const descriptionMap = {
        'morning': 'Kamu adalah Morning Learner! Waktu pagi adalah waktu emasmu untuk belajar.',
        'afternoon': 'Kamu adalah Afternoon Learner! Waktu siang adalah waktu terbaikmu untuk belajar.',
        'evening': 'Kamu adalah Evening Learner! Waktu malam adalah waktu produktifmu.',
        'night': 'Kamu adalah Night Learner! Waktu malam hingga dini hari adalah waktu terbaikmu.',
        'late_night': 'Kamu adalah Late Night Warrior! Waktu larut malam adalah waktu emasmu.'
    };
    
    // Create time distribution data
    const timeData = [
        { label: 'Morning (06:00-11:59)', fillPercentage: 0, color: 'bg-amber-400', description: descriptionMap['morning'], learnerType: learnerTypeMap['morning'] },
        { label: 'Afternoon (12:00-17:59)', fillPercentage: 0, color: 'bg-blue-400', description: descriptionMap['afternoon'], learnerType: learnerTypeMap['afternoon'] },
        { label: 'Evening (18:00-23:59)', fillPercentage: 0, color: 'bg-indigo-700', description: descriptionMap['evening'], learnerType: learnerTypeMap['evening'] },
        { label: 'Night (00:00-05:59)', fillPercentage: 0, color: 'bg-indigo-700', description: descriptionMap['night'], learnerType: learnerTypeMap['night'] }
    ];
    
    // Gunakan deskripsi dan learner type dari JSON jika tersedia
    let activeTimeDesc = descriptionMap[mostActiveTime] || descriptionMap['morning'];
    let activeLearnerType = learnerTypeMap[mostActiveTime] || learnerTypeMap['morning'];
    
    if (data.jsonInsight && data.jsonInsight.most_active_time) {
        const jsonPeriod = data.jsonInsight.most_active_time.period.toLowerCase();
        if (jsonPeriod === mostActiveTime.toLowerCase()) {
            activeTimeDesc = data.jsonInsight.most_active_time.description;
            activeLearnerType = data.jsonInsight.most_active_time.period_name;
            console.log('[transformInsightsData] Using most active time description from user_insights.json');
        }
    }
    
    // Set active time to 80% if data exists, otherwise 0
    if (hasData) {
        timeData[timeInfo.index].fillPercentage = 80;
    }
    timeData[timeInfo.index].description = activeTimeDesc;
    timeData[timeInfo.index].learnerType = activeLearnerType;

    // Learning Pattern Details
    const patternMap = {
        'Consistent Learner': { color: '#44dcd0', description: 'Kamu tipe belajar yang slow but steady!' },
        'Fast Learner': { color: '#0c9bab', description: 'Kamu cepat menyerap materi!' },
        'Reflective Learner': { color: '#0d1c31', description: 'Kamu suka merenung dan memahami secara mendalam.' }
    };

    let patternDescription = patternMap[learningPattern]?.description || patternMap['Reflective Learner'].description;
    if (jsonInsight && jsonInsight.learning_pattern) {
        patternDescription = jsonInsight.learning_pattern.description;
    }

    const patternInfo = {
        ...(patternMap[learningPattern] || patternMap['Reflective Learner']),
        description: patternDescription
    };

    // Create learning pattern data untuk pie chart
    // Pastikan tidak ada duplikasi pattern
    const allPatterns = ['Consistent Learner', 'Fast Learner', 'Reflective Learner'];
    const otherPatterns = allPatterns.filter(p => p !== learningPattern);
    
    const learningPatternData = [
        { label: learningPattern, percentage: hasData ? 60 : 0, color: patternInfo.color },
        { label: otherPatterns[0], percentage: hasData ? 25 : 0, color: patternMap[otherPatterns[0]].color },
        { label: otherPatterns[1], percentage: hasData ? 15 : 0, color: patternMap[otherPatterns[1]].color }
    ];

    // Consistency details
    let consistencyDesc = 'Ayo tingkatkan konsistensi belajarmu!';
    let consistencyLevel = 'LOW';
    
    if (hasData) {
        if (consistencyScore >= 80) consistencyLevel = 'HIGH';
        else if (consistencyScore >= 40) consistencyLevel = 'MEDIUM';
        else consistencyLevel = 'LOW';
    }

    if (jsonInsight && jsonInsight.consistency) {
        // Ambil deskripsi persis dari user_insights.json
        consistencyDesc = jsonInsight.consistency.description;
        
        // Pastikan level sesuai dengan kategori di JSON
        const category = jsonInsight.consistency.category;
        if (category.includes('High')) consistencyLevel = 'HIGH';
        else if (category.includes('Medium')) consistencyLevel = 'MEDIUM';
        else if (category.includes('Low')) consistencyLevel = 'LOW';
        
        console.log('[transformInsightsData] Using consistency data from user_insights.json');
    }

    // Generate insight summary text based on JSON if available
    let insightSummaryText = data.insights || 'Belum ada insight tersedia.';
    if (jsonInsight) {
        insightSummaryText = `Berdasarkan data kamu, kamu memiliki ${jsonInsight.consistency.category}. Konsistensi skor kamu adalah ${consistencyScore.toFixed(1)}%.`;
    } else if (!hasData) {
        insightSummaryText = 'Belum ada data aktivitas untuk dianalisis. Skor konsistensimu adalah 0%.';
    }

    return {
        display_name: user?.displayName ? 
            user.displayName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') 
            : (jsonInsight?.display_name || 'Pengguna'),
        consistency_score: consistencyScore,
        insight_text: insightSummaryText,
        most_active_time: {
            data: timeData,
            description: hasData ? `Waktu belajarmu yang paling produktif adalah ${timeInfo.label.split('(')[0].trim()}.` : 'Belum ada data waktu produktif.',
            activeTime: timeInfo.label.split('(')[0].trim(),
            timeRange: timeInfo.label.match(/\(([^)]+)\)/)?.[1] || '06:00-11:59',
            learnerType: activeLearnerType,
            detailDescription: activeTimeDesc
        },
        learning_pattern: {
            data: learningPatternData,
            description: hasData ? patternInfo.description : 'Belum ada data pola belajar.',
            mlPattern: learningPattern
        },
        consistency: {
            description: consistencyDesc,
            level: consistencyLevel
        }
    };
};

// FIXED FRAME COMPONENT (The Insight Page) 

export function Frame({ onGoBack, userData = {} }) {
    const { user } = useAuth();
    const [insightsData, setInsightsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State untuk Modal
    const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
    const [timeModalData, setTimeModalData] = useState(null);
    const [isPatternModalOpen, setIsPatternModalOpen] = useState(false);
    const [patternModalData, setPatternModalData] = useState(null);
    const [isConsistencyModalOpen, setIsConsistencyModalOpen] = useState(false);
    const [consistencyModalData, setConsistencyModalData] = useState(null);

    // Handler untuk membuka modal
    const handleShowTimeDetail = (data) => {
        setTimeModalData(data);
        setIsTimeModalOpen(true);
    };

    const handleShowPatternDetail = (data) => {
        setPatternModalData(data);
        setIsPatternModalOpen(true);
    };

    const handleShowConsistencyDetail = (data) => {
        setConsistencyModalData(data);
        setIsConsistencyModalOpen(true);
    };

    const imagePath = "https://placehold.co/100x100/1a3a5a/FFF1DF?text=G"; 
    const G_Logo = imagePath;

    // Fetch insights from backend
    useEffect(() => {
        const fetchInsights = async () => {
            if (!user?.userId) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                
                // Normalize userId: remove .0 if exists (e.g., '5181638.0' -> '5181638')
                let normalizedUserId = String(user.userId).trim();
                if (normalizedUserId.endsWith('.0')) {
                    normalizedUserId = normalizedUserId.slice(0, -2);
                }
                
                console.log('[Frame] Original userId:', user.userId);
                console.log('[Frame] Normalized userId:', normalizedUserId);
                console.log('[Frame] User object:', user);
                
                const response = await insightsAPI.getCurrentInsights(normalizedUserId);
                
                console.log('[Frame] API Response:', response);
                console.log('[Frame] Response success:', response.success);
                console.log('[Frame] Response data:', response.data);
                
                if (response.success) {
                    // Jika ada data, gunakan data tersebut
                    // Jika tidak ada data (null), tetap set null dan biarkan transformInsightsData handle default
                    if (response.data) {
                        console.log('[Frame] Setting insights data:', response.data);
                        console.log('[Frame] Consistency Score in response:', response.data.consistencyScore);
                        console.log('[Frame] Consistency Score type:', typeof response.data.consistencyScore);
                        setInsightsData(response.data);
                    } else {
                        console.log('[Frame] No data in response, using null (will show default)');
                        setInsightsData(null);
                    }
                } else {
                    // Jika response tidak success, set null untuk trigger default data
                    console.log('[Frame] Response not successful:', response.error || 'Unknown error');
                    setInsightsData(null);
                }
            } catch (err) {
                console.error('[Frame] Error fetching insights:', err);
                console.error('[Frame] Error details:', err.response?.data || err.message);
                // On error, set null untuk trigger default data instead of showing error
                setInsightsData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchInsights();
    }, [user?.userId]);

    // Loading state
    if (loading) {
        return (
            <div className="bg-[#FFF1DF] min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a3a5a] mb-4"></div>
                    <p className="text-gray-600">Memuat data insights...</p>
                </div>
            </div>
        );
    }

    // Transform data dari backend insights
    const transformedData = transformInsightsData(insightsData, user);
    
    // Merge with userData prop if provided (for backward compatibility)
    // PENTING: consistency_score dan learningPattern HARUS dari model ML (backend)
    // JANGAN override dengan data dari user dataset
    const finalUserData = {
        ...transformedData,
        ...userData,
        // Override dengan data dari ML model (backend)
        // Data ini berasal dari model ML, bukan dari user dataset
        display_name: transformedData.display_name,
        consistency_score: transformedData.consistency_score, // Dari ML model
        insight_text: transformedData.insight_text, // Dari ML model
        most_active_time: transformedData.most_active_time, // Dari ML model
        learning_pattern: transformedData.learning_pattern, // Dari ML model
        consistency: transformedData.consistency
    };
    
    console.log('[Frame] Using ML model data:');
    console.log('[Frame] - consistency_score (from ML):', finalUserData.consistency_score);
    console.log('[Frame] - learningPattern (from ML):', finalUserData.learning_pattern?.mlPattern);
    console.log('[Frame] - mostActiveTime (from ML):', insightsData?.mostActiveTime);

    // Akses data dengan aman menggunakan optional chaining
    const learningPatternData = finalUserData.learning_pattern?.data || [];
    const mainPattern = getMainPattern(learningPatternData);

    // Note: Tidak perlu error state karena transformInsightsData akan handle null data dengan default values

    return (
        <div className="bg-[#FFF1DF] min-h-screen font-sans">
            <div className="bg-gradient-to-br from-[#0d1c31] to-[#1a3a5a] px-6 py-10 relative overflow-hidden">
                
                {/* Inline CSS for fonts */}
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Open+Sans:wght@400;600&display=swap');
                    .font-sans { font-family: 'Inter', sans-serif; }
                `}</style>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button 
                        onClick={onGoBack} 
                        className="mb-6 flex items-center text-white/90 hover:text-white transition text-sm"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5 mr-1" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Dashboard
                    </button>

                    <div className="flex items-start justify-between gap-8">
                        <div className="flex-1 max-w-md">
                            <h1 className="text-white text-3xl font-bold mb-3 leading-snug">
                                Welcome Back to AI Learning Insight
                            </h1>
                            <p className="text-white/90 text-sm leading-relaxed">
                                Lihat kebiasaan belajarmu, evaluasi efektivitasmu, 
                                dan temukan cara belajar yang lebih tepat
                            </p>
                        </div>

                        {/* Dekoratip */}
                        <div className="hidden lg:flex absolute top-0 bottom-0 right-0 transform translate-x-1/4 items-center">
                            <div className="relative w-[200px] h-[200px] transform scale-110">
                                <div className="absolute inset-0 w-full h-full rounded-full bg-transparent 
                                    border-[10px] border-[#FFF1DF] border-opacity-70 
                                    transform scale-[1.15] shadow-xl">
                                </div>
                                <div className="absolute inset-0 w-[200px] h-[200px] rounded-full flex items-center justify-center 
                                    bg-gradient-to-br from-[#122941] to-[#254C75] z-10 
                                    shadow-2xl shadow-blue-900/50">
                                    <div className="w-[170px] h-[170px] rounded-full flex items-center justify-center 
                                        bg-gradient-to-br from-[#1A3A5A] to-[#0d1c31] overflow-hidden">
                                        <img 
                                            src={G_Logo} 
                                            alt="G Logo"
                                            className="w-full h-full object-contain p-4" 
                                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/170x170/1A3A5A/FFF1DF?text=LOGO"; }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">

                {/* Robot + Welcome message */}
                <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between gap-6">
                    <img 
                        src="/group-19.png"
                        alt="Robot Illustration"
                        className="w-24 h-24 object-contain flex-shrink-0"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/128x128/FFFFFF/0d1c31?text=ROBOT+AI"; }}
                    />
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-[#0d1c31] mb-1">
                            Hallo {finalUserData.display_name || 'Pengguna'}, ini catatan learning kamu!
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Pantau perkembangan dan kebiasaan belajar kamu setiap hari
                        </p>
                    </div>
                </div>

                {/* Most Active Time Section */}
                <MostActiveTimeSection 
                    timeData={finalUserData.most_active_time?.data}
                    insightText={finalUserData.most_active_time?.description}
                    onShowDetail={handleShowTimeDetail}
                    mostActiveTimeData={finalUserData.most_active_time}
                />

                {/* Consistency Score Section */}
                <Card className="bg-[#fff6f6] rounded-[58px] shadow-[0px_4px_30px_#00000040] border-0">
                    <CardContent className="p-12">
                        <div className="flex flex-col lg:flex-row items-start gap-16">
                            <div className="flex-1">
                                <ConsistencyScoreSection 
                                    score={finalUserData.consistency_score || 0}
                                    level={finalUserData.consistency?.level}
                                    insight={finalUserData.consistency?.description}
                                    insightText={finalUserData.insight_text}
                                    onShowDetail={handleShowConsistencyDetail}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Learning Pattern Section */}
                <Card className="bg-[#fff6f6] rounded-[58px] shadow-[0px_4px_30px_#00000040] border-0">
                    <CardContent className="p-8 lg:p-12"> 
                        <div className="flex flex-col lg:flex-row items-center justify-around gap-16">
                            <LearningPatternSection 
                                learningPatternData={learningPatternData}
                                mainPattern={mainPattern}
                                description={finalUserData.learning_pattern?.description}
                                onShowDetail={handleShowPatternDetail}
                            />
                        </div>
                    </CardContent>
                </Card>


                {/* Consistent Learner Section (Quote) */}
                <div className="mt-10"> 
                    <ConsistentLearnerSection />
                </div>
                
            </div>

            {/* Modal Components */}
            <ActiveTimeDetailModal 
                isOpen={isTimeModalOpen}
                onClose={() => setIsTimeModalOpen(false)}
                data={timeModalData}
            />
            
            <LearningPatternDetailModal 
                isOpen={isPatternModalOpen}
                onClose={() => setIsPatternModalOpen(false)}
                data={patternModalData}
            />

            <ConsistencyDetailModal 
                isOpen={isConsistencyModalOpen}
                onClose={() => setIsConsistencyModalOpen(false)}
                data={consistencyModalData}
            />

        </div>
    );
}