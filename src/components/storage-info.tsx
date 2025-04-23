
import React, { useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFileStorage } from '@/hooks/use-file-storage';

export const formatFileSize = (bytes?: number) => {
  if (bytes === undefined || bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const StorageInfo: React.FC = () => {
  const { storageUsed, storageLimit, getStorageInfo } = useFileStorage();
  
  useEffect(() => {
    getStorageInfo();
  }, []);
  
  const usedPercentage = storageLimit > 0 ? (storageUsed / storageLimit) * 100 : 0;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Utilizzo Spazio</CardTitle>
        <CardDescription>
          Monitora lo spazio di archiviazione utilizzato
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Progress value={usedPercentage} className="h-2" />
        </div>
        <div className="flex justify-between text-sm">
          <span>Utilizzato: {formatFileSize(storageUsed)}</span>
          <span>Totale: {formatFileSize(storageLimit)}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {usedPercentage > 90 ? (
            <p className="text-destructive">Attenzione: il tuo spazio di archiviazione è quasi esaurito!</p>
          ) : (
            <p>Hai utilizzato il {Math.round(usedPercentage)}% del tuo spazio di archiviazione.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
