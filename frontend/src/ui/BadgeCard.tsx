import React from 'react';
import '../ui/BadgeCard.css'

interface BadgeCardProps {
  color: string,
  title: string,
  subtitle: string,
  progress: number,
  daysLeft?: number | null,
}

const BadgeCard = ({ 
  color, 
  title, 
  subtitle, 
  progress, 
  daysLeft = null
}: BadgeCardProps) => {
  return (
    <div className={`bcard ${color}`}>
      <header className="bcard-header">
        <div className="date">Feb 2, 2025</div>
      </header>
      <div className="bcard-body">
        <h3>{title}</h3>
        <p>{subtitle}</p>
        <div className="progress">
          <span>Progress</span>
          <div className="progress-bar">
            <div className={`progress-fill ${color}`} style={{ width: `${progress}%` }}></div>
          </div>
          <span>{progress}%</span>
        </div>
      </div>
      <footer className="bcard-footer">
        <ul>
        </ul>
        <a href="#" className="btn-countdown">
            {daysLeft ? `${daysLeft} days left` : 'Unlimited'}
        </a>
      </footer>
    </div>
  );
};

export default BadgeCard;