package com.devmountain.myGainsJournal.services;

import com.devmountain.myGainsJournal.dtos.JournalEntryDto;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface JournalEntryService {
    @Transactional
    void addEntry(JournalEntryDto journalEntryDto, Long userId);

    @Transactional
    void deleteEntryById(Long entryId);

    @Transactional
    void updateEntryById(JournalEntryDto journalEntryDto);

    List<JournalEntryDto> getAllEntriesByUserId(Long userId);

    @Transactional
    Optional<JournalEntryDto> getEntryById(Long entryId);
}
