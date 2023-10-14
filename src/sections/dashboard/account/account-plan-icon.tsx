import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from 'src/libs/firebase';

type Name = 'startup' | 'standard' | 'business';

interface PlanIconProps {
  name: Name;
}

const PlanIcon: React.FC<PlanIconProps> = ({ name }) => {
  const [iconUrl, setIconUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchIcon = async () => {
      const storageRef = ref(storage, `icons/${name}.svg`);
      const url = await getDownloadURL(storageRef);
      setIconUrl(url);
    };

    fetchIcon();
  }, [name]);

  if (!iconUrl) {
    return <p>Loading...</p>;
  }

  return <img src={iconUrl} alt={`${name} plan icon`} />;
};

export default PlanIcon;
