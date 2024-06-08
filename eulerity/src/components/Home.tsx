import React, { useState } from 'react';
import styled from 'styled-components';
import usePetData from './usePetData';
import { saveAs } from 'file-saver';

const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-top: 40px;
`;

const PetCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  width: 250px;
  height: 400px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  position: relative;

  &:hover {
    transform: scale(1.05);
  }
`;

const PetImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PetInfo = styled.div`
  padding: 16px;
`;

const PetTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  height: 40px;  /* Set a fixed height */
`;

const PetTitle = styled.h2`
  margin: 0;
  font-size: 1.2em;
`;

const PetDate = styled.p`
  font-size: 0.9em;
  color: #888;
  margin: 0;
`;

const PetDescription = styled.p`
  color: #555;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const SearchBar = styled.input`
  width: 80%;
  padding: 8px;
  margin-bottom: 20px;
  margin: 0 auto;
  display: block;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
  @media (max-width: 610px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.button`
  padding: 3px 16px;

  background-color: #373737;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
  @media screen and (max-width: 610px) {
    width: 350px;
  }
  @media screen and (max-width: 410px) {
    width: 300px;
  }
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const DownloadButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  @media screen and (max-width: 610px) {
    width: 150px;
  }
`;

const Checkbox = styled.input`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

const PetGallery: React.FC = () => {
  const { pets, loading, error } = usePetData();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPets, setSelectedPets] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const togglePetSelection = (petIndex: number) => {
    if (selectedPets.includes(petIndex)) {
      setSelectedPets(selectedPets.filter(index => index !== petIndex));
    } else {
      setSelectedPets([...selectedPets, petIndex]);
    }
  };

  const selectAllPets = () => {
    setSelectedPets(filteredPets.map((_, index) => index));
  };

  const clearSelection = () => {
    setSelectedPets([]);
  };

  const downloadSelectedPets = () => {
    const selectedPetUrls = selectedPets.map(index => pets[index].url);

    selectedPetUrls.forEach(url => {
      const urlObject = new URL(url);
      urlObject.searchParams.delete('format');

      fetch(urlObject.toString())
        .then(response => response.blob())
        .then(blob => {
          const filename = urlObject.pathname.substring(urlObject.pathname.lastIndexOf('/') + 1);
          saveAs(blob, filename);
        });
    });
  };

  const sortPets = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  const filteredPets = pets
    .filter(pet => {
      const query = searchQuery.toLowerCase().trim();
      if (query.startsWith('&t:')) {
        const titleQuery = query.substring(3).trim();
        return pet.title.toLowerCase().includes(titleQuery);
      } else if (query.startsWith('&d:')) {
        const descQuery = query.substring(3).trim();
        return pet.description.toLowerCase().includes(descQuery);
      } else {
        return (
          pet.title.toLowerCase().includes(query) ||
          pet.description.toLowerCase().includes(query)
        );
      }
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <SearchBar
        type="text"
        placeholder="Search by &t: title or &d: description"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <ButtonContainer>
        <Button onClick={selectAllPets}>Select All</Button>
        <Button onClick={clearSelection} disabled={selectedPets.length === 0}>Clear Selection</Button>
        <Button onClick={() => sortPets('asc')}>Sort by Name A-Z</Button>
        <Button onClick={() => sortPets('desc')}>Sort by Name Z-A</Button>
      </ButtonContainer>
      <GalleryContainer>
        {filteredPets.map((pet, index) => (
          <PetCard key={index}>
            <PetImage src={pet.url} alt={pet.title} />
            <PetInfo>
              <PetTitleContainer>
                <PetTitle>{pet.title}</PetTitle>
                <PetDate>{new Date(pet.created).toLocaleDateString()}</PetDate>
              </PetTitleContainer>
              <PetDescription>{pet.description}</PetDescription>
            </PetInfo>
            <Checkbox
              type="checkbox"
              checked={selectedPets.includes(index)}
              onChange={() => togglePetSelection(index)}
            />
          </PetCard>
        ))}
      </GalleryContainer>
      <DownloadButton onClick={downloadSelectedPets} disabled={selectedPets.length === 0}>
        Download Selected
      </DownloadButton>
    </>
  );
};

export default PetGallery;
