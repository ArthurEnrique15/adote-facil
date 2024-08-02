import { animalTypesForSelect } from '@/constants/animal-types-for-select'
import { DefaultSelect } from '../DefaultSelect'
import * as S from './styles'
import { animalGenderForSelect } from '@/constants/animal-gender-for-select'
import { Plus } from '@phosphor-icons/react'
import { useState } from 'react'

// TODO implementar regra do input nasc ter o formato de data
export function AnimalForm() {
  const [animalPictures, setAnimalPictures] = useState<File[]>([])

  const handleAnimalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAnimalPictures([...animalPictures, ...Array.from(e.target.files)])
    }
  }

  const handleRemoveAnimalPicture = (picIndex: number) => {
    const newAnimalPictures = animalPictures.filter(
      (pic, index) => picIndex !== index,
    )

    setAnimalPictures(newAnimalPictures)
  }

  return (
    <S.Form>
      <S.FormRow>
        <S.AnimalTypeInputWrapper>
          <span>Tipo</span>
          <DefaultSelect
            placeholder="Selecione um tipo"
            items={animalTypesForSelect}
          />
        </S.AnimalTypeInputWrapper>

        <S.AnimalBirthInputWrapper>
          <label>
            Nasc.
            <input type="text" />
          </label>
        </S.AnimalBirthInputWrapper>
      </S.FormRow>

      <S.FormRow>
        <S.AnimalRaceInputWrapper>
          <label>
            Raça
            <input type="text" />
          </label>
        </S.AnimalRaceInputWrapper>

        <S.AnimalGenderInputWrapper>
          <span>Gênero</span>
          <DefaultSelect placeholder="" items={animalGenderForSelect} />
        </S.AnimalGenderInputWrapper>
      </S.FormRow>

      <S.FormRow>
        <S.AnimalSizeWrapper>
          <span>Porte</span>
          <S.RadioGroupRoot>
            <S.RadioGroupItemWrapper>
              <S.RadioGroupItem value="pequeno" id="r1">
                <S.RadioGroupIndicator />
              </S.RadioGroupItem>
              <label htmlFor="r1">Pequeno</label>
            </S.RadioGroupItemWrapper>
            <S.RadioGroupItemWrapper>
              <S.RadioGroupItem value="medio" id="r2">
                <S.RadioGroupIndicator />
              </S.RadioGroupItem>
              <label htmlFor="r2">Médio</label>
            </S.RadioGroupItemWrapper>
            <S.RadioGroupItemWrapper>
              <S.RadioGroupItem value="grande" id="r3">
                <S.RadioGroupIndicator />
              </S.RadioGroupItem>
              <label htmlFor="r3">Grande</label>
            </S.RadioGroupItemWrapper>
          </S.RadioGroupRoot>
        </S.AnimalSizeWrapper>
      </S.FormRow>

      <S.FormRow>
        <S.AnimalPicturesInputWrapper>
          <label>Fotos</label>
          <input
            type="file"
            id="animalPictures"
            name="animalPictures"
            accept="image/png, image/jpeg"
            onChange={handleAnimalImageUpload}
            multiple
          />
          <S.AddAnimalPicturesSwiper spaceBetween={10} slidesPerView={3}>
            <S.AnimalPictureSwiperSlide>
              <S.AnimalPicturesInput htmlFor="animalPictures">
                <div>
                  <Plus size={24} />
                </div>
                <span>Adicionar</span>
              </S.AnimalPicturesInput>
            </S.AnimalPictureSwiperSlide>

            {animalPictures.map((file, index) => (
              <S.AnimalPictureSwiperSlide key={index}>
                <S.AnimalPicture
                  src={URL.createObjectURL(file)}
                  width={92}
                  height={137}
                  alt="animal picture"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAnimalPicture(index)}
                >
                  Remover
                </button>
              </S.AnimalPictureSwiperSlide>
            ))}
          </S.AddAnimalPicturesSwiper>
        </S.AnimalPicturesInputWrapper>
      </S.FormRow>
    </S.Form>
  )
}
