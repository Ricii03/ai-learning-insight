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

const Button = ({ className = "", children, onClick, variant = 'primary', disabled = false }) => {
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
            disabled={disabled}
            className={`${baseClasses} ${variantClasses} ${className}`}
        >
            {children}
        </button>
    );
};

// AI LEARNING INSIGHT PAGE

// MODAL COMPONENTS

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

    // LOGIC PENENTUAN PATH GAMBAR BERDASARKAN activeTime
    const getImageSource = (time) => {
        const normalizedTime = time.toUpperCase().replace(/\s/g, '_');
        switch (normalizedTime) {
            case 'MORNING':
                return "/images/most_active_time/morning_learner.png";
            case 'AFTERNOON':
                return "/images/most_active_time/afternoon_learner.png";
            case 'LATE_NIGHT':
            case 'NIGHT':
                return "/images/most_active_time/night_learner.png"; 
            case 'EVENING':
            default:
                return "/images/most_active_time/evening_learner.png"; 
        }
    };
    
    const imageSource = getImageSource(activeTime);

    // RENDER MODAL
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-0 overflow-hidden bg-white shadow-xl rounded-[32px] !border-0"> 
                <CardHeader className="p-0">
                    <div className="relative p-6 bg-gradient-to-br from-[#0d1c31] to-[#1a3a5a]">
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
                            {activeTime?.toUpperCase() || 'N/A'} ({timeRange || 'N/A'})
                        </h4>
                        
                        <div className="w-full flex justify-center mb-6">
                            <img 
                                src={imageSource} 
                                alt={`${learnerType || 'Learner'} Illustration`}
                                className="w-32 h-32 object-contain"
                                onError={(e) => { e.target.onerror = null; e.target.src = defaultPlaceholderImage; }}
                            />
                        </div>

                        <h5 className="text-xl font-bold text-gray-900 mb-3">
                             {learnerType || 'Learner'} 
                        </h5>
                        <p className="text-sm text-gray-800 leading-relaxed mb-8"> 
                            {description || 'Data tidak tersedia.'} 
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
    
    // Data statis yang tidak berubah
    const topLabel = "Learning Pattern"; 
    const introText = "Setiap orang punya cara belajar yang berbeda. Pola yang paling mencerminkan gaya belajarmu adalah....";
    const defaultPlaceholderImage = "https://placehold.co/150x150/50C878/FFFFFF?text=PATTERN";

    // LOGIC PENENTUAN PATH GAMBAR BERDASARKAN patternType
    const getImageSource = (type) => {
        if (!type) return "/images/learning_pattern/consistent_learner.png";
        const normalizedType = type.toUpperCase().replace(/\s/g, '_');
        
        switch (normalizedType) {
            case 'CONSISTENT_LEARNER':
                return "/images/learning_pattern/consistent_learner.png"; 
            case 'FAST_LEARNER':
                return "/images/learning_pattern/fast_learner.png"; 
            case 'REFLECTIVE_LEARNER':
                return "/images/learning_pattern/reflective_learner.png";
            default:
                return "/images/learning_pattern/consistent_learner.png"; 
        }
    };
    
    const imagePath = getImageSource(patternType);

    // RENDER MODAL
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-0 overflow-hidden bg-white shadow-xl rounded-[32px] !border-0">
                <CardHeader className="p-0">
                    <div className="relative p-6 bg-gradient-to-br from-[#0d1c31] to-[#1a3a5a]"> 
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
                                alt={`${patternType || 'Pattern'} Illustration`}
                                className="w-32 h-32 object-contain" 
                                onError={(e) => { e.target.onerror = null; e.target.src = defaultPlaceholderImage; }}
                            />
                        </div>

                        <h5 className="text-xl font-bold text-gray-900 mb-3">
                            {patternType || 'N/A'}
                        </h5>
                        <p className="text-sm text-gray-800 leading-relaxed mb-8"> 
                            {description || 'Pola belajar belum terdeteksi.'} 
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
    const introText = "Konsistensi adalah kunci kesuksesan. Skor konsistensimu menunjukkan seberapa rutin kamu belajar.";
    const defaultPlaceholderImage = "https://placehold.co/150x150/283e75/FFF?text=CONSISTENCY";
    
    const getImageSource = (level) => {
        if (!level) return "/images/consistency_score/high_consistency.png";
        const normalizedLevel = level.toUpperCase();

        switch (normalizedLevel) {
            case 'LOW':
                return "/images/consistency_score/low_consistency.png"; 
            case 'MEDIUM':
            case 'MODERATE':
                return "/images/consistency_score/medium_consistency.png"; 
            case 'HIGH':
            default:
                return "/images/consistency_score/high_consistency.png"; 
        }
    };
    
    const imagePath = getImageSource(consistencyLevel);
    
    const statusLabel = (consistencyLevel || 'HIGH').toUpperCase() + " Consistency";
    
    // RENDER MODAL
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-center justify-center p-4">
            
            <Card className="max-w-md w-full p-0 overflow-hidden bg-white shadow-xl rounded-[32px] !border-none">
                <CardHeader className="p-0">
                    <div className="relative p-6 bg-gradient-to-br from-[#0d1c31] to-[#1a3a5a]"> 
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
                            {statusLabel} ({scoreValue || 0}%)
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
                            {description || 'Ayo tingkatkan konsistensi belajarmu!'} 
                        </p>

                    </div>
                
                    {/* TOMBOL KECIL DI TENGAH */}
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
const ConsistencyScoreSection = ({ score = 0, insight = 'Data konsistensi belum tersedia.', insightText = 'Ayo tingkatkan konsistensi belajarmu!', onShowDetail }) => {
    // score berasal dari backend: insightsData.consistencyScore
    // Pastikan score adalah number dan dalam range 0-100
    const numericScore = typeof score === 'number' ? score : parseFloat(score || 0);
    const normalizedScore = Math.max(0, Math.min(100, numericScore)); // Clamp antara 0-100
    
    // Format score untuk display (tanpa desimal, seperti di Framebaru.jsx)
    const displayScore = Math.round(normalizedScore);
    
    // angle dihitung dari score: score * 3.6 (untuk circular progress)
    // 100% = 360 derajat, jadi 1% = 3.6 derajat
    const chartColor = '#283e75'; 
    const backgroundColor = '#e0e0e0'; 
    const angle = normalizedScore * 3.6;
    
    // Logika penentuan Status dan Tips untuk Modal
    let consistencyLevel = 'HIGH';
    if (normalizedScore < 50) {
        consistencyLevel = 'LOW';
    } else if (normalizedScore < 80) {
        consistencyLevel = 'MEDIUM';
    }

    const detailData = {
        consistencyLevel: consistencyLevel,
        scoreValue: displayScore,
        description: insight,
    };
    
    console.log('[ConsistencyScoreSection] Received score from backend:', score);
    console.log('[ConsistencyScoreSection] Normalized score:', normalizedScore);
    console.log('[ConsistencyScoreSection] Display score:', displayScore);
    console.log('[ConsistencyScoreSection] Calculated angle:', angle); 
    
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
                                onClick={() => onShowDetail && onShowDetail(detailData)}
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
const MostActiveTimeSection = ({ timeData = [], insightText = 'Optimalkan jam fokus terbaikmu!', onShowDetail }) => {
    
    const mapTimeToColor = (data) => {
        return data.map(time => {
            const timeLabel = time.label.toLowerCase();
            let colorClass = 'bg-gray-400'; 

            if (timeLabel.includes('morning')) {
                colorClass = 'bg-amber-400'; 
            } else if (timeLabel.includes('afternoon')) {
                colorClass = 'bg-blue-400'; 
            } else if (timeLabel.includes('evening')) {
                colorClass = 'bg-indigo-700'; 
            } else if (timeLabel.includes('late night') || timeLabel.includes('night')) { 
                colorClass = 'bg-purple-900'; 
            }
            
            return {
                ...time,
                color: colorClass 
            };
        });
    };

    const coloredTimeData = mapTimeToColor(timeData);

    const mostActive = coloredTimeData.reduce((prev, current) => 
        (prev.fillPercentage > current.fillPercentage) ? prev : current, 
        { fillPercentage: -1, label: 'N/A', description: 'Data tidak tersedia.', learnerType: 'N/A', learnerImage: '' } 
    );
    
    const finalInsight = `Waktu belajarmu yang paling produktif adalah ${mostActive.label.split('(')[0].trim()}. ${insightText}`;
    
    const labelParts = mostActive.label.match(/(.*)\s\((.*)\)/) || [null, mostActive.label, 'N/A'];

    const detailData = {
        activeTime: labelParts[1]?.trim() || mostActive.label.split('(')[0].trim() || 'Waktu Terbaik',
        timeRange: labelParts[2]?.replace(')', '').trim() || 'N/A', 
        description: mostActive.description || 'Data tidak tersedia.', 
        learnerType: mostActive.learnerType || 'Learner', 
        learnerImage: mostActive.learnerImage || '', 
    }; 

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
                                <div className="relative h-32 lg:h-40 flex items-end justify-around"> 
                                    
                                    {coloredTimeData.map((time, index) => ( 
                                        <div
                                            key={index}
                                            className="flex flex-col items-center gap-1 w-1/4 max-w-[80px] h-full"
                                        >
                                            
                                            {/* Bar Grafik Dinamis - Kontainer Utama Bar */}
                                            <div className="w-full h-full border border-solid border-black/30 rounded-lg shadow-inner relative overflow-hidden bg-gray-200/50">
                                                <div 
                                                    className={`absolute bottom-0 w-full ${time.color} transition-all duration-500 hover:opacity-80`}
                                                    style={{ height: `${time.fillPercentage}%` }}
                                                >
                                                </div>
                                            </div>
                                                
                                            {/* Label Waktu */}
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
                                    >
                                        {finalInsight}
                                    </p>
                                            
                                    <Button 
                                        onClick={() => onShowDetail && onShowDetail(detailData)} 
                                        className="bg-[#283e75] hover:bg-[#283e75]/90 rounded-full h-8 lg:h-10 px-6 lg:px-8 gap-1"
                                    >
                                        <span className="font-['Open_Sans',Helvetica] font-normal text-[#fff6f6] text-xs lg:text-sm tracking-[0] leading-[normal]">
                                            SELENGKAPNYA
                                        </span>
                                    </Button>
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
        { label: "Data not available", percentage: 100, color: "#ccc" }
    ];

    // Data lengkap untuk Modal Learning Pattern
    const detailData = {
        patternType: mainPattern.label || 'N/A',
        description: description,
    };

    const pieChartStyle = {
        background: generateConicGradient(dataToDisplay),
    };

    return (
        <section className="w-full py-8 px-6 bg-[#ffffff] rounded-3xl lg:rounded-[58px] shadow-xl border-0">
            
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
                    <div className="flex-shrink-0 relative w-32 h-32 rounded-full overflow-hidden shadow-xl">
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
                                {/* Label */}
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
                        {mainPattern.label}
                    </h3>
                </div>
            </div>
                
            {/* Ringkasan & Tombol */}
            <div className="relative pt-6 text-center border-t border-black/10"> 
                <p className="font-['Inter',Helvetica] font-normal text-sm lg:text-base text-black/80 tracking-[0] leading-normal mb-6 max-w-2xl mx-auto">
                    {description}
                </p>
                    
                <Button 
                    onClick={() => onShowDetail && onShowDetail(detailData)}
                    className="bg-[#283e75] hover:bg-[#1f3160] rounded-full h-9 px-7 gap-1.5"
                >
                    <span className="font-['Open_Sans',Helvetica] font-normal text-[#fff6f6] text-sm lg:text-base tracking-[0] leading-[normal]">
                        SELENGKAPNYA
                    </span>
                </Button>
            </div>
        </section>
    );
};


// 4. ConsistentLearnerSection (Quote Section) 
const ConsistentLearnerSection = () => {
    return (
        <div className="w-full overflow-hidden bg-[#fff6f6]"> 
            <div className="relative py-12 lg:py-20 max-w-5xl mx-auto px-4 lg:px-8 text-center">
                <section 
                    className={`font-['Open_Sans',Helvetica] font-semibold text-lg lg:text-xl tracking-[0] leading-normal text-center max-w-[884px] mx-auto relative z-20 text-[#25586e]`}
                    style={{ lineHeight: '1.5' }}
                >
                    "Hasil yang luar biasa datang bukan dari tindakan yang besar, tetapi dari konsistensi tindakan-tindakan kecil."
                </section>
                <div 
                    className={`font-['Inter',Helvetica] font-semibold text-sm lg:text-base text-center mt-8 relative z-20 text-[#25586e]`}
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
    // If no insights data, return null (will show empty state)
    if (!insightsData) {
        return null;
    }

    // Map mostActiveTime to time distribution
    const timeMap = {
        'morning': { label: 'Morning (06:00-11:59)', index: 0 },
        'afternoon': { label: 'Afternoon (12:00-17:59)', index: 1 },
        'evening': { label: 'Evening (18:00-23:59)', index: 2 },
        'night': { label: 'Night (00:00-05:59)', index: 3 }
    };

    // Use data from insights backend (not from user dataset)
    const mostActiveTime = insightsData.mostActiveTime || 'morning';
    // Check if consistencyScore exists and is a valid number
    // Handle case where consistencyScore might be 0 (which is a valid value)
    // If backend returns 0 and user has consistencyScore in dataset, use user's data as fallback
    let consistencyScore = 0;
    if (insightsData.consistencyScore !== undefined && insightsData.consistencyScore !== null) {
        const parsedScore = Number(insightsData.consistencyScore);
        if (!isNaN(parsedScore)) {
            consistencyScore = parsedScore;
        }
    }
    
    // Fallback: If backend returns 0 and user has consistencyScore in dataset, use user's data
    if (consistencyScore === 0 && user?.consistencyScore !== undefined && user.consistencyScore > 0) {
        console.log('[transformInsightsData] Backend returned 0, using user dataset fallback:', user.consistencyScore);
        consistencyScore = Number(user.consistencyScore);
    }
    
    console.log('[transformInsightsData] Raw insightsData:', insightsData);
    console.log('[transformInsightsData] consistencyScore from backend:', insightsData.consistencyScore);
    console.log('[transformInsightsData] consistencyScore type:', typeof insightsData.consistencyScore);
    console.log('[transformInsightsData] consistencyScore after transform:', consistencyScore);
    
    const timeInfo = timeMap[mostActiveTime] || timeMap['morning'];
    
    // Create time distribution data with descriptions for modal
    const timeDataConfig = {
        'morning': { 
            label: 'Morning (06:00-11:59)', 
            description: 'Pagi hari adalah waktu kamu paling segar dan fokus. Kamu adalah Early Bird Sejati, manfaatkan energi pagi ini untuk menyelesaikan tugas-tugas terberat.',
            learnerType: 'Early Bird Learner',
            learnerImage: 'https://placehold.co/150x150/FFC107/000000?text=MORNING'
        },
        'afternoon': { 
            label: 'Afternoon (12:00-17:59)', 
            description: 'Siang hari itu prime time kamu! Kepala udah gak ngantuk pagi, tapi juga belum masuk mode capek. Kombinasi perfect buat belajar dengan santai tapi tetap produktif.',
            learnerType: 'Prime-Time Learner',
            learnerImage: 'https://placehold.co/150x150/007bff/FFFFFF?text=AFTERNOON'
        },
        'evening': { 
            label: 'Evening (18:00-23:59)', 
            description: 'Malam hari kamu baru bisa fokus, setelah semua urusan selesai. Kamu adalah Night Owl yang termotivasi, gunakan waktu ini untuk meninjau ulang materi.',
            learnerType: 'Night Owl Learner',
            learnerImage: 'https://placehold.co/150x150/4B0082/FFFFFF?text=EVENING'
        },
        'night': { 
            label: 'Night (00:00-05:59)', 
            description: 'Hanya saat semua orang tidur, kamu menemukan ketenangan. Kamu adalah Midnight Warrior, gunakan keheningan ini untuk fokus mendalam pada satu subjek.',
            learnerType: 'Midnight Warrior Learner',
            learnerImage: 'https://placehold.co/150x150/222222/FFFFFF?text=NIGHT'
        }
    };
    
    const timeData = [
        { 
            label: timeDataConfig.morning.label, 
            fillPercentage: 0, 
            color: 'bg-amber-400',
            description: timeDataConfig.morning.description,
            learnerType: timeDataConfig.morning.learnerType,
            learnerImage: timeDataConfig.morning.learnerImage
        },
        { 
            label: timeDataConfig.afternoon.label, 
            fillPercentage: 0, 
            color: 'bg-blue-400',
            description: timeDataConfig.afternoon.description,
            learnerType: timeDataConfig.afternoon.learnerType,
            learnerImage: timeDataConfig.afternoon.learnerImage
        },
        { 
            label: timeDataConfig.evening.label, 
            fillPercentage: 0, 
            color: 'bg-indigo-700',
            description: timeDataConfig.evening.description,
            learnerType: timeDataConfig.evening.learnerType,
            learnerImage: timeDataConfig.evening.learnerImage
        },
        { 
            label: timeDataConfig.night.label, 
            fillPercentage: 0, 
            color: 'bg-indigo-700',
            description: timeDataConfig.night.description,
            learnerType: timeDataConfig.night.learnerType,
            learnerImage: timeDataConfig.night.learnerImage
        }
    ];
    
    // Set active time to 80%, distribute remaining to others
    timeData[timeInfo.index].fillPercentage = 80;
    const remaining = 20;
    const otherCount = 3;
    const otherPercentage = Math.floor(remaining / otherCount);
    
    timeData.forEach((time, index) => {
        if (index !== timeInfo.index) {
            time.fillPercentage = otherPercentage;
        }
    });

    // If insights data exists, use it (timeData already created above)

    // Map learning pattern
    const patternMap = {
        'Consistent Learner': { color: '#44dcd0', description: 'Kamu tipe belajar yang slow but steady! Konsisten dan teratur dalam belajar.' },
        'Fast Learner': { color: '#0c9bab', description: 'Kamu cepat menyerap materi! Belajar dengan intensitas tinggi dalam waktu singkat.' },
        'Reflective Learner': { color: '#0d1c31', description: 'Kamu suka merenung dan memahami secara mendalam sebelum melanjutkan.' }
    };

    const learningPattern = insightsData.learningPattern || 'Reflective Learner';
    const patternInfo = patternMap[learningPattern] || patternMap['Reflective Learner'];

    // Create learning pattern data (simplified - you might want to get actual percentages from backend)
    // Ensure no duplicate labels in the array
    const allPatterns = ['Consistent Learner', 'Fast Learner', 'Reflective Learner'];
    const otherPatterns = allPatterns.filter(p => p !== learningPattern);
    
    const learningPatternData = [
        { label: learningPattern, percentage: 60, color: patternInfo.color },
        { label: otherPatterns[0], percentage: 25, color: patternMap[otherPatterns[0]].color },
        { label: otherPatterns[1], percentage: 15, color: patternMap[otherPatterns[1]].color }
    ];

    // Consistency description based on score
    // Use consistencyScore yang sudah dihitung sebelumnya (line 417-419)
    let consistencyDesc = 'Ayo tingkatkan konsistensi belajarmu!';
    const score = consistencyScore; // Gunakan consistencyScore yang sudah dihitung
    if (score >= 80) {
        consistencyDesc = 'Konsistensi kamu kelas expert! Disiplin banget sampai belajar udah kayak bagian dari rutinitas harian kamu.';
    } else if (score >= 60) {
        consistencyDesc = 'Konsistensi kamu sudah baik! Pertahankan momentum ini dan coba tingkatkan lagi.';
    } else if (score >= 40) {
        consistencyDesc = 'Konsistensi kamu sedang berkembang. Coba buat jadwal belajar yang lebih teratur.';
    } else {
        consistencyDesc = 'Ayo tingkatkan konsistensi belajarmu! Mulai dengan belajar sedikit tapi rutin setiap hari.';
    }

    return {
        display_name: user?.displayName ? 
            user.displayName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') 
            : 'Pengguna',
        consistency_score: score,
        insight_text: insightsData.insights || 'Belum ada insight tersedia.',
        most_active_time: {
            data: timeData,
            description: `Waktu belajarmu yang paling produktif adalah ${timeInfo.label.split('(')[0].trim()}. Kamu memiliki tingkat aktivitas 80% di waktu ini. Manfaatkan waktu ini untuk materi yang paling menantang!`
        },
        learning_pattern: {
            data: learningPatternData,
            description: patternInfo.description
        },
        consistency: {
            description: consistencyDesc
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

    // Handler Modal
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
    
    // Jika tidak ada data dari backend, tampilkan empty state
    if (!transformedData) {
        return (
            <div className="bg-[#FFF1DF] min-h-screen font-sans">
                <div className="bg-gradient-to-br from-[#0d1c31] to-[#1a3a5a] px-6 py-10 relative overflow-hidden">
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
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg 
                                    className="w-12 h-12 text-gray-400" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-[#0d1c31] mb-4">
                                Belum Ada Data Insights
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Belum ada data aktivitas belajar untuk menampilkan insights. 
                                Mulai belajar untuk melihat analisis kebiasaan belajarmu!
                            </p>
                            <button
                                onClick={onGoBack}
                                className="bg-[#1a3a5a] text-white px-6 py-3 rounded-lg hover:bg-[#254C75] transition font-semibold"
                            >
                                Kembali ke Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    // Merge with userData prop if provided (for backward compatibility)
    const finalUserData = {
        ...transformedData,
        ...userData,
        // Override with transformed data from backend
        display_name: transformedData.display_name,
        consistency_score: transformedData.consistency_score,
        insight_text: transformedData.insight_text,
        most_active_time: transformedData.most_active_time,
        learning_pattern: transformedData.learning_pattern,
        consistency: transformedData.consistency
    };
    
    console.log('[Frame] finalUserData.consistency_score:', finalUserData.consistency_score);
    console.log('[Frame] finalUserData:', finalUserData);

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
                        <ArrowRightIcon className="w-5 h-5 mr-1 rotate-180" />
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
                />

                {/* Consistency Score Section */}
                <ConsistencyScoreSection 
                    score={finalUserData.consistency_score || 0}
                    insight={finalUserData.consistency?.description}
                    insightText={finalUserData.insight_text}
                    onShowDetail={handleShowConsistencyDetail}
                />

                {/* Learning Pattern Section */}
                <LearningPatternSection 
                    learningPatternData={learningPatternData}
                    mainPattern={mainPattern}
                    description={finalUserData.learning_pattern?.description}
                    onShowDetail={handleShowPatternDetail}
                />


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