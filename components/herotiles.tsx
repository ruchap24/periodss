"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { Users, Star, Shield } from "lucide-react";

interface HeroTilesProps {
    darkMode: boolean;
}

export default function HeroTiles({ darkMode }: HeroTilesProps) {
    // State for the percentage
    const [percentage, setPercentage] = useState(0);
    const [jobsDaily, setJobsDaily] = useState(0);
    const [fasterMatches, setFasterMatches] = useState(0);

    useEffect(() => {
        gsap.to(
            {},
            {
                duration: 2,
                onUpdate: function () {
                    setPercentage(Math.round(this.progress() * 100)); 
                    setJobsDaily(Math.round(this.progress() * 90)); 
                    setFasterMatches(Math.round(this.progress() * 4)); 
                },
            }
        );
    }, []);

    return (
        <div className={`flex justify-center items-center space-x-8 text-sm ${
            darkMode ? "text-white/75" : "text-purple-800"
        }`}>
            <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                {jobsDaily}+
                <span className="text-sm"> Happy Users</span>
            </div>
            <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 fill-current" />
                {fasterMatches}+
                <span className="text-sm"> Rating</span>
            </div>
            <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                {percentage}%
                <span className="text-sm"> Private</span>
            </div>
        </div>
    );
}