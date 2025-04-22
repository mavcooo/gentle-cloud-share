
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PhotosPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Mock data for photos
  const photos = [
    {
      id: '1',
      title: 'Family Picnic',
      src: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&q=80&w=600&h=400',
      date: 'Jun 15, 2023',
      album: 'Family'
    },
    {
      id: '2',
      title: 'Beach Vacation',
      src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=600&h=400',
      date: 'Jul 23, 2023',
      album: 'Vacation'
    },
    {
      id: '3',
      title: 'Mountain Hike',
      src: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=600&h=400',
      date: 'Aug 5, 2023',
      album: 'Nature'
    },
    {
      id: '4',
      title: 'Birthday Party',
      src: 'https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?auto=format&fit=crop&q=80&w=600&h=400',
      date: 'Apr 12, 2023',
      album: 'Family'
    },
    {
      id: '5',
      title: 'City Trip',
      src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=400',
      date: 'May 3, 2023',
      album: 'Travel'
    },
    {
      id: '6',
      title: 'Sunset at the Beach',
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600&h=400',
      date: 'Sep 18, 2023',
      album: 'Vacation'
    },
    {
      id: '7',
      title: 'Backyard Barbecue',
      src: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=600&h=400',
      date: 'Jul 4, 2023',
      album: 'Family'
    },
    {
      id: '8',
      title: 'Office Party',
      src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=600&h=400',
      date: 'Dec 20, 2022',
      album: 'Work'
    },
  ];
  
  // Filter photos based on search query
  const filteredPhotos = searchQuery
    ? photos.filter(photo => 
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.album.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : photos;
  
  // Group photos by album
  const photosByAlbum = filteredPhotos.reduce((acc, photo) => {
    if (!acc[photo.album]) {
      acc[photo.album] = [];
    }
    acc[photo.album].push(photo);
    return acc;
  }, {} as Record<string, typeof photos>);
  
  const handlePhotoClick = (src: string) => {
    setSelectedPhoto(src);
  };
  
  const closePhotoPreview = () => {
    setSelectedPhoto(null);
  };
  
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar isMobile={isMobile} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 p-4 md:p-6 max-w-screen overflow-auto">
        {isMobile && !sidebarOpen && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="mb-4" 
            onClick={toggleSidebar}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
        )}
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Photos</h1>
          <p className="text-muted-foreground">Browse and manage your photos</p>
        </div>
        
        <div className="mb-6">
          <Input
            placeholder="Search photos or albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        {selectedPhoto ? (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Photo Preview</h2>
                <Button variant="ghost" size="icon" onClick={closePhotoPreview}>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </Button>
              </div>
              <div className="flex-1 overflow-auto">
                <div className="p-4 flex items-center justify-center">
                  <img 
                    src={selectedPhoto} 
                    alt="Selected photo" 
                    className="max-w-full max-h-[70vh] object-contain rounded-md"
                  />
                </div>
              </div>
              <div className="p-4 border-t flex justify-between">
                <Button variant="outline" size="sm">
                  <svg className="mr-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 1C7.22386 1 7 1.22386 7 1.5V8.5C7 8.77614 7.22386 9 7.5 9C7.77614 9 8 8.77614 8 8.5V1.5C8 1.22386 7.77614 1 7.5 1ZM4.85355 4.14645C4.65829 4.34171 4.65829 4.65829 4.85355 4.85355L7.14645 7.14645C7.34171 7.34171 7.65829 7.34171 7.85355 7.14645L10.1464 4.85355C10.3417 4.65829 10.3417 4.34171 10.1464 4.14645C9.95118 3.95118 9.63461 3.95118 9.43934 4.14645L7.5 6.08579L5.56066 4.14645C5.36539 3.95118 5.04882 3.95118 4.85355 4.14645ZM2.5 10C2.22386 10 2 10.2239 2 10.5C2 10.7761 2.22386 11 2.5 11H12.5C12.7761 11 13 10.7761 13 10.5C13 10.2239 12.7761 10 12.5 10H2.5ZM2 13.5C2 13.2239 2.22386 13 2.5 13H12.5C12.7761 13 13 13.2239 13 13.5C13 13.7761 12.7761 14 12.5 14H2.5C2.22386 14 2 13.7761 2 13.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <svg className="mr-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7.5C5 8.32843 4.32843 9 3.5 9C2.67157 9 2 8.32843 2 7.5C2 6.67157 2.67157 6 3.5 6C4.32843 6 5 6.67157 5 7.5ZM11.5 6C10.6716 6 10 6.67157 10 7.5C10 8.32843 10.6716 9 11.5 9C12.3284 9 13 8.32843 13 7.5C13 6.67157 12.3284 6 11.5 6ZM5.88924 8.06292L9.21421 9.43257C9.0389 9.70701 8.93845 10.0293 8.93845 10.375C8.93845 11.2713 9.66715 12 10.5635 12C11.4598 12 12.1885 11.2713 12.1885 10.375C12.1885 9.47868 11.4598 8.75 10.5635 8.75C10.3431 8.75 10.1337 8.79645 9.94231 8.88115L6.61734 7.51151C6.6388 7.4067 6.65 7.29787 6.65 7.1875C6.65 7.07713 6.6388 6.9683 6.61734 6.86349L9.94231 5.49385C10.1337 5.57855 10.3431 5.625 10.5635 5.625C11.4598 5.625 12.1885 4.89632 12.1885 4C12.1885 3.10368 11.4598 2.375 10.5635 2.375C9.66715 2.375 8.93845 3.10368 8.93845 4C8.93845 4.3457 9.0389 4.66795 9.21421 4.94239L5.88924 6.31204C5.697 6.00515 5.36357 5.79141 4.98155 5.75259V8.62237C5.36357 8.58355 5.697 8.36981 5.88924 8.06292Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                  Share
                </Button>
              </div>
            </div>
          </div>
        ) : null}
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full max-w-md mb-6">
            <TabsTrigger value="all">All Photos</TabsTrigger>
            <TabsTrigger value="albums">Albums</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {filteredPhotos.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-muted rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V2.5C1 1.67157 1.67157 1 2.5 1ZM2.5 2C2.22386 2 2 2.22386 2 2.5V8.3636L3.6818 6.6818C3.76809 6.59551 3.88572 6.54797 4.00774 6.55007C4.12975 6.55216 4.24568 6.60372 4.32895 6.69293L7.87355 10.4901L10.6818 7.6818C10.8575 7.50607 11.1425 7.50607 11.3182 7.6818L13 9.3636V2.5C13 2.22386 12.7761 2 12.5 2H2.5ZM2 12.5V9.6364L3.98867 7.64773L7.5311 11.4421L8.94113 13H2.5C2.22386 13 2 12.7761 2 12.5ZM12.5 13H10.155L8.48336 11.153L11 8.6364L13 10.6364V12.5C13 12.7761 12.7761 13 12.5 13ZM6.64922 5.5C6.64922 5.03013 7.03013 4.64922 7.5 4.64922C7.96987 4.64922 8.35078 5.03013 8.35078 5.5C8.35078 5.96987 7.96987 6.35078 7.5 6.35078C7.03013 6.35078 6.64922 5.96987 6.64922 5.5ZM7.5 3.74922C6.53307 3.74922 5.74922 4.53307 5.74922 5.5C5.74922 6.46693 6.53307 7.25078 7.5 7.25078C8.46693 7.25078 9.25078 6.46693 9.25078 5.5C9.25078 4.53307 8.46693 3.74922 7.5 3.74922Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium">No photos found</h3>
                <p className="text-muted-foreground">Try adjusting your search</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPhotos.map((photo) => (
                  <Card 
                    key={photo.id} 
                    className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handlePhotoClick(photo.src)}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={photo.src} 
                        alt={photo.title} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardContent className="p-3">
                      <div className="font-medium truncate">{photo.title}</div>
                      <div className="text-xs text-muted-foreground flex justify-between">
                        <span>{photo.date}</span>
                        <span>{photo.album}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="albums">
            {Object.keys(photosByAlbum).length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-muted rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3.5C2 3.22386 2.22386 3 2.5 3H7.12713L8.06065 4.40033C8.13563 4.50438 8.26166 4.56862 8.39575 4.56862H12.5C12.7761 4.56862 13 4.79248 13 5.06862V11.5C13 11.7761 12.7761 12 12.5 12H2.5C2.22386 12 2 11.7761 2 11.5V3.5ZM2.5 2C1.67157 2 1 2.67157 1 3.5V11.5C1 12.3284 1.67157 13 2.5 13H12.5C13.3284 13 14 12.3284 14 11.5V5.06862C14 4.24019 13.3284 3.56862 12.5 3.56862H8.75154L7.81802 2.16829C7.59415 1.85615 7.22661 1.66667 6.83333 1.66667H2.5C1.67157 1.66667 1 2.33824 1 3.16667V11.5C1 11.5 1 12 1.5 12C1.5 12 2 12 2 11.5V3.16667C2 2.89052 2.22386 2.66667 2.5 2.66667H6.83333C6.90496 2.66667 6.97138 2.70229 7.01168 2.76369L7.94521 4.16536C8.16908 4.4775 8.53662 4.66667 8.92989 4.66667H12.5C12.7761 4.66667 13 4.89052 13 5.16667V11.5C13 11.7761 12.7761 12 12.5 12H2.5C2.22386 12 2 11.7761 2 11.5V3.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium">No albums found</h3>
                <p className="text-muted-foreground">Try adjusting your search</p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(photosByAlbum).map(([albumName, albumPhotos]) => (
                  <div key={albumName}>
                    <h3 className="text-xl font-semibold mb-4">{albumName}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {albumPhotos.map((photo) => (
                        <Card 
                          key={photo.id} 
                          className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handlePhotoClick(photo.src)}
                        >
                          <div className="aspect-video relative overflow-hidden">
                            <img 
                              src={photo.src} 
                              alt={photo.title} 
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <CardContent className="p-3">
                            <div className="font-medium truncate">{photo.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {photo.date}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PhotosPage;
