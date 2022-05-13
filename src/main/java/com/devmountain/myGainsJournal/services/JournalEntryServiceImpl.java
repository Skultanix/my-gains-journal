package com.devmountain.myGainsJournal.services;

import com.devmountain.myGainsJournal.dtos.JournalEntryDto;
import com.devmountain.myGainsJournal.entities.JournalEntry;
import com.devmountain.myGainsJournal.entities.User;
import com.devmountain.myGainsJournal.repositories.JournalEntryRepository;
import com.devmountain.myGainsJournal.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JournalEntryServiceImpl implements JournalEntryService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JournalEntryRepository journalEntryRepository;

    @Override
    @Transactional
    public void addEntry(JournalEntryDto journalEntryDto, Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        JournalEntry journalEntry = new JournalEntry(journalEntryDto);
        userOptional.ifPresent(journalEntry::setUser);
        journalEntryRepository.saveAllAndFlush(journalEntry);
    }

    @Override
    @Transactional
    public void deleteEntryById(Long entryId) {
        Optional<JournalEntry> journalEntryOptional = journalEntryRepository.findById(entryId);
        journalEntryOptional.ifPresent(journalEntry -> journalEntryRepository.delete(journalEntry));
    }

    @Override
    @Transactional
    public void updateEntryById(JournalEntryDto journalEntryDto) {
        Optional<JournalEntry> journalEntryOptional = journalEntryRepository.findById(journalEntryDto.getId());
        journalEntryOptional.ifPresent(journalEntry -> {
            journalEntry.setExerciseType(journalEntryDto.getExerciseType());
            journalEntry.setExerciseName(journalEntryDto.getExerciseName());
            journalEntry.setSetCount(journalEntryDto.getSetCount());
            journalEntry.setSetOne(journalEntryDto.getSetOne());
            journalEntry.setSetTwo(journalEntryDto.getSetTwo());
            journalEntry.setSetThree(journalEntryDto.getSetThree());
            journalEntry.setSetFour(journalEntryDto.getSetFour());
            journalEntry.setSetFive(journalEntryDto.getSetFive());
            journalEntry.setDistance(journalEntryDto.getDistance());
            journalEntry.setTime(journalEntryDto.getTime());
        });
    }

    @Override
    public List<JournalEntryDto> getAllEntriesByUserId(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            List<JournalEntry> journalEntryList = journalEntryRepository.findAllByUserEquals(userOptional.get());
            return journalEntryList.stream().map(journalEntry -> new JournalEntryDto(journalEntry)).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    @Override
    @Transactional
    public Optional<JournalEntryDto> getEntryById(Long entryId) {
        Optional<JournalEntry> journalEntryOptional = journalEntryRepository.findById(entryId);
        if (journalEntryOptional.isPresent()) {
            return Optional.of(new JournalEntryDto(journalEntryOptional.get()));
        }
        return Optional.empty();
    }
}
