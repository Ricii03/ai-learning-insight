import React, { useState, useEffect } from 'react';
import { ClockIcon, ArrowRightIcon, Zap, Lightbulb, TrendingUp } from "lucide-react";
import { insightsAPI } from '../../services/api'; 

// Komponen Pembantu

export const Card = ({ className = "", children }) => (
    <div className={`rounded-xl border border-gray-200 bg-white text-gray-900 shadow-md ${className}`}>
        {children}
    </div>
);

export const CardContent = ({ className = "", children }) => (
    <div className={`p-6 pt-0 ${className}`}>
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

const Button = ({ className = "", children, onClick, variant = 'primary', disabled = false }) => {
    let baseClasses = `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors 
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
                disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2`;
    
    let variantClasses = 'bg-[#1a3a5a] text-white hover:bg-[#254C75] focus-visible:ring-[#254C75]';
    
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

// Komponen Modal

const ModalCloseButton = ({ onClose }) => (
    <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-white hover:text-gray-200"
    >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
);


// // 1. ActiveTimeDetailModal (DINAMIS)
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
                            {activeTime.toUpperCase()} ({timeRange})
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
                             {learnerType} 
                        </h5>
                        <p className="text-sm text-gray-800 leading-relaxed mb-8"> 
                            {description} 
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

// 2. LearningPatternDetailModal (DINAMIS)
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
        const normalizedType = type.toUpperCase().replace(/\s/g, '_');
        
        // Asumsi struktur folder di public/images/learning_pattern/ (disesuaikan agar sesuai dengan nama file umum)
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
                                alt={`${patternType} Illustration`}
                                className="w-32 h-32 object-contain" 
                                onError={(e) => { e.target.onerror = null; e.target.src = defaultPlaceholderImage; }}
                            />
                        </div>

                        <h5 className="text-xl font-bold text-gray-900 mb-3">
                            {patternType}
                        </h5>
                        <p className="text-sm text-gray-800 leading-relaxed mb-8"> 
                            {description}
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
                return "/images/consistency_score/low_consistency.png"; 
            case 'MEDIUM':
                return "/images/consistency_score/medium_consistency.png"; 
            case 'HIGH':
            default:
                return "/images/consistency_score/high_consistency.png"; 
        }
    };
    
    const imagePath = getImageSource(consistencyLevel);
    
    const statusLabel = consistencyLevel.toUpperCase() + " Consistency";
    
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
                            {statusLabel} ({scoreValue}%)
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
                            {description} 
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
// MostActiveTimeSection
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
            } else if (timeLabel.includes('late night')) { 
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
        label: labelParts[1]?.trim() || mostActive.label.split('(')[0].trim() || 'Waktu Terbaik',
        timeRange: labelParts[2]?.replace(')', '').trim() || 'N/A', 
        description: mostActive.description, 
        learnerType: mostActive.learnerType, 
        learnerImage: mostActive.learnerImage, 
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
                                    >
                                        {finalInsight}
                                    </p>
                                            
                                    <Button 
                                        onClick={() => onShowDetail(detailData)} 
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

// ConsistencyScoreSection
const ConsistencyScoreSection = ({ score = 0, insight = 'Data konsistensi belum tersedia. Mulai belajar untuk melihat polanya!', insightText = 'Ayo tingkatkan konsistensi belajarmu!', onShowDetail }) => {
    const chartColor = '#283e75'; 
    const backgroundColor = '#e0e0e0'; 
    const angle = score * 3.6; 
    
    // Logika penentuan Status dan Tips untuk Modal
    let statusLabel = '';
    let tips = [];
    if (score >= 80) {
        statusLabel = 'High Consistency';
        tips = ["Pertahankan rutinitas belajarmu.", "Coba tingkatkan intensitas sedikit demi sedikit.", "Ajak teman untuk belajar bersama agar lebih termotivasi."];
    } else if (score >= 50) {
        statusLabel = 'Moderate Consistency';
        tips = ["Coba buat jadwal belajar yang lebih terstruktur.", "Gunakan pengingat untuk sesi belajar.", "Jangan tunda tugas yang mudah."];
    } else {
        statusLabel = 'Low Consistency';
        tips = ["Tetapkan waktu belajar harian yang singkat (misalnya 30 menit) dan jangan dilewatkan.", "Hilangkan distraksi saat sesi belajar (jauhkan HP/media sosial).", "Rayakan keberhasilan kecil untuk membangun momentum."];
    }

    const detailData = {
        score: score,
        statusLabel: statusLabel,
        description: insight,
        tips: tips
    };

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
                                        {score}
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
                                onClick={() => onShowDetail(detailData)}
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


// HELPER FUNCTION UNTUK PIE CHART
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

const getMainPattern = (data) => {
    if (!data || data.length === 0) return { 
        label: "Visual Learner", 
        percentage: 0, 
        color: "#f59e0b",
        image: "https://placehold.co/160x160/f59e0b/FFF?text=VISUAL",
        tips: ["Gunakan mind map dan diagram.", "Tonton video pembelajaran.", "Warna dan highlight catatan."]
    };
    return data.reduce((prev, current) => 
        (prev.percentage > current.percentage) ? prev : current
    );
};

// LearningPatternSection
const LearningPatternSection = ({ learningPatternData = [], mainPattern = { label: "N/A" }, description = 'Pola belajar belum terdeteksi. Mulai belajar lebih aktif untuk melihat polanya!', onShowDetail }) => {
    
    // Fallback/Default Data (DILENGKAPI DENGAN IMAGE DAN TIPS UNTUK MODAL)
    const defaultPatternData = [
         { 
             label: "Visual", 
             percentage: 40, 
             color: "#f59e0b",
             image: "https://placehold.co/160x160/f59e0b/FFF?text=VISUAL",
             tips: ["Gunakan mind map dan diagram.", "Tonton video pembelajaran.", "Warna dan highlight catatan."]
         },
         { 
             label: "Auditory", 
             percentage: 30, 
             color: "#10b981",
             image: "https://placehold.co/160x160/10b981/FFF?text=AUDITORY",
             tips: ["Dengarkan podcast atau rekaman kuliah.", "Baca catatan dengan suara keras.", "Diskusi dengan teman."]
         },
         { 
             label: "Kinesthetic", 
             percentage: 30, 
             color: "#3b82f6",
             image: "https://placehold.co/160x160/3b82f6/FFF?text=KINESTHETIC",
             tips: ["Buat simulasi atau role-play.", "Belajar sambil berjalan atau bergerak.", "Gunakan flashcard fisik atau eksperimen."]
         },
    ];
    
    const dataToDisplay = learningPatternData.length > 0 ? learningPatternData : defaultPatternData;
    
    // Pastikan mainPattern yang dilempar ke modal punya image dan tips (gunakan fallback jika data asli kurang)
    const finalMainPattern = {
        ...mainPattern,
        // Cari detail lengkap dari dataToDisplay
        ...(dataToDisplay.find(item => item.label === mainPattern.label) || getMainPattern(defaultPatternData)),
    };
    
    // Data lengkap untuk Modal Learning Pattern
    const detailData = {
        mainPattern: finalMainPattern,
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
                    onClick={() => onShowDetail(detailData)}
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


// ConsistentLearnerSection
const ConsistentLearnerSection = () => {
    return (
        <div className="w-full overflow-hidden bg-[#fff6f6]]"> 
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


// Komponen Frame (The Main Component)

export function Frame({ onGoBack, userData = {} }) {
    
    const G_Logo = "/logo.jpeg"; 
    
    // State untuk data insights dari backend
    const [insightsData, setInsightsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // State untuk Modal Waktu Aktif
    const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
    const [timeModalData, setTimeModalData] = useState(null);

    // State untuk Modal Pola Belajar
    const [isPatternModalOpen, setIsPatternModalOpen] = useState(false);
    const [patternModalData, setPatternModalData] = useState(null);
    
    // State untuk Modal Konsistensi (BARU)
    const [isConsistencyModalOpen, setIsConsistencyModalOpen] = useState(false);
    const [consistencyModalData, setConsistencyModalData] = useState(null);

    // Fetch insights from backend
    useEffect(() => {
        const fetchInsights = async () => {
            if (!userData?.userId && !userData?._id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const userId = userData.userId || userData._id;
                const response = await insightsAPI.getCurrentInsights(userId);
                
                if (response.success && response.data) {
                    setInsightsData(response.data);
                } else {
                    setError('Gagal mengambil data insights');
                }
            } catch (err) {
                console.error('Error fetching insights:', err);
                setError('Terjadi kesalahan saat mengambil data insights');
            } finally {
                setLoading(false);
            }
        };

        fetchInsights();
    }, [userData]);


    // Handler Modal Waktu Aktif
    const handleShowTimeDetail = (data) => {
        setTimeModalData(data);
        setIsTimeModalOpen(true);
    };

    // Handler Modal Pola Belajar
    const handleShowPatternDetail = (data) => {
        setPatternModalData(data);
        setIsPatternModalOpen(true);
    };
    
    // Handler Modal Konsistensi (BARU)
    const handleShowConsistencyDetail = (data) => {
        setConsistencyModalData(data);
        setIsConsistencyModalOpen(true);
    };


    // Merge insights data from backend with userData
    const mergedData = insightsData ? { ...userData, ...insightsData } : userData;

    // Data Pola Belajar (Dilengkapi dengan Image dan Tips untuk Modal)
    const rawLearningPatternData = mergedData.learning_pattern?.data || mergedData.learningPatternData || [
        { 
             label: "Visual", 
             percentage: 40, 
             color: "#f59e0b",
             image: "https://placehold.co/160x160/f59e0b/FFF?text=VISUAL",
             tips: ["Gunakan mind map dan diagram.", "Tonton video pembelajaran.", "Warna dan highlight catatan."]
         },
         { 
             label: "Auditory", 
             percentage: 30, 
             color: "#10b981",
             image: "https://placehold.co/160x160/10b981/FFF?text=AUDITORY",
             tips: ["Dengarkan podcast atau rekaman kuliah.", "Baca catatan dengan suara keras.", "Diskusi dengan teman."]
         },
         { 
             label: "Kinesthetic", 
             percentage: 30, 
             color: "#3b82f6",
             image: "https://placehold.co/160x160/3b82f6/FFF?text=KINESTHETIC",
             tips: ["Buat simulasi atau role-play.", "Belajar sambil berjalan atau bergerak.", "Gunakan flashcard fisik atau eksperimen."]
         },
    ];
    
    const mainPattern = getMainPattern(rawLearningPatternData);
    const patternDescription = mergedData.learning_pattern?.description || mergedData.learningPatternDescription || 'Pola Visual adalah yang paling dominan dalam caramu belajar. Kamu cenderung menggunakan gambar, diagram, dan warna untuk memahami dan mengingat informasi.';


    // Data Konsistensi
    const consistencyScore = mergedData.consistency_score || mergedData.consistencyScore || 35;
    const consistencyInsight = mergedData.consistency_insight || mergedData.consistencyInsight || 'Belajar kamu masih agak acak nih. Wajar kalau lagi banyak distraksi. Yuk pelan-pelan bangun habit biar ritme makin stabil.';
    const consistencyInsightText = mergedData.consistency_insight_text || mergedData.consistencyInsightText || 'Ayo tingkatkan konsistensimu perlahan.';


    // Data Waktu Aktif
    const defaultTimeData = [
        { label: "Morning (6 AM - 12 PM)", fillPercentage: 40, description: "Pagi hari adalah waktu kamu paling segar dan fokus. Kamu adalah Early Bird Sejati, manfaatkan energi pagi ini untuk menyelesaikan tugas-tugas terberat." , learnerType: "Early Bird Learner", learnerImage: "https://placehold.co/150x150/FFC107/000000?text=MORNING" },
        { label: "Afternoon (1 PM - 5 PM)", fillPercentage: 85, description: "Siang hari itu prime time kamu! Kepala udah gak ngantuk pagi, tapi juga belum masuk mode capek. Kombinasi perfect buat belajar dengan santai tapi tetap produktif.", learnerType: "Prime-Time Learner", learnerImage: "https://placehold.co/150x150/007bff/FFFFFF?text=AFTERNOON" },
        { label: "Evening (6 PM - 10 PM)", fillPercentage: 60, description: "Malam hari kamu baru bisa fokus, setelah semua urusan selesai. Kamu adalah Night Owl yang termotivasi, gunakan waktu ini untuk meninjau ulang materi.", learnerType: "Night Owl Learner", learnerImage: "https://placehold.co/150x150/4B0082/FFFFFF?text=EVENING" },
        { 
            label: "Late Night (11 PM - 5 AM)", 
            fillPercentage: 20, 
            description: "Hanya saat semua orang tidur, kamu menemukan ketenangan. Kamu adalah Midnight Warrior, gunakan keheningan ini untuk fokus mendalam pada satu subjek.", 
            learnerType: "Midnight Warrior Learner", 
            learnerImage: "https://placehold.co/150x150/222222/FFFFFF?text=LATE+NIGHT" 
        },
    ];

    const mostActiveTimeData = mergedData.most_active_time?.data && mergedData.most_active_time.data.length > 0
        ? mergedData.most_active_time.data
        : mergedData.mostActiveTimeData && mergedData.mostActiveTimeData.length > 0
        ? mergedData.mostActiveTimeData
        : defaultTimeData; 

    const activeTimeInsight = mergedData.most_active_time?.description || mergedData.mostActiveTimeDescription || 'Kamu tipe yang perlu warm-up dulu... Manfaatkan waktu ini untuk materi yang paling menantang!';

    // Show loading state
    if (loading) {
        return (
            <div className="bg-[#FFF1DF] min-h-screen font-sans flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a3a5a] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Memuat insights...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error && !insightsData) {
        return (
            <div className="bg-[#FFF1DF] min-h-screen font-sans flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                    <button
                        onClick={onGoBack}
                        className="text-[#1a3a5a] hover:underline"
                    >
                        Kembali ke Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#FFF1DF] min-h-screen font-sans">
            
            {/* Header Area */}
            <div className="bg-gradient-to-br from-[#0d1c31] to-[#1a3a5a] px-6 py-10 relative overflow-hidden">
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
                                <div className="absolute inset-0 w-[200px] h-[200px] rounded-full flex items-center justify-center 
                                    bg-gradient-to-br from-[#122941] to-[#254C75] z-10 
                                    shadow-2xl shadow-blue-900/50">
                                    <div className="w-[170px] h-[170px] rounded-full flex items-center justify-center 
                                        bg-gradient-to-br from-[#1A3A5A] to-[#0d1c31] overflow-hidden">
                                        <img src={G_Logo} alt="G Logo" className="w-full h-full object-contain p-4" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/170x170/1A3A5A/FFF1DF?text=LOGO"; }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
                
                {/* 1. Most Active Time Section */}
                <MostActiveTimeSection 
                    timeData={mostActiveTimeData}
                    insightText={activeTimeInsight}
                    onShowDetail={handleShowTimeDetail}
                />

                {/* 2. Consistency Score Section (Memanggil Modal Konsistensi) */}
                <ConsistencyScoreSection 
                    score={consistencyScore}
                    insight={consistencyInsight}
                    insightText={consistencyInsightText}
                    onShowDetail={handleShowConsistencyDetail} // Pasang handler baru
                />
                
                {/* 3. Learning Pattern Section (Memanggil Modal Pola Belajar) */}
                <LearningPatternSection 
                    learningPatternData={rawLearningPatternData} 
                    mainPattern={mainPattern} 
                    description={patternDescription}
                    onShowDetail={handleShowPatternDetail}
                />
                
            </div>
            
            {/* 4. Consistent Learner Quote Section */}
            <ConsistentLearnerSection />

            
            {/* Modal Component Waktu Aktif */}
            <ActiveTimeDetailModal 
                isOpen={isTimeModalOpen}
                onClose={() => setIsTimeModalOpen(false)}
                activeTimeData={timeModalData} 
            />
            
            {/* Modal Component Pola Belajar */}
             <LearningPatternDetailModal 
                isOpen={isPatternModalOpen}
                onClose={() => setIsPatternModalOpen(false)}
                patternData={patternModalData} 
            />

            {/* Modal Component Konsistensi (BARU) */}
            <ConsistencyDetailModal 
                isOpen={isConsistencyModalOpen}
                onClose={() => setIsConsistencyModalOpen(false)}
                consistencyData={consistencyModalData} 
            />

        </div>
    );
}