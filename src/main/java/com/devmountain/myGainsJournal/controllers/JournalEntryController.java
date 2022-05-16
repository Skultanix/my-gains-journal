package com.devmountain.myGainsJournal.controllers;

import com.devmountain.myGainsJournal.dtos.JournalEntryDto;
import com.devmountain.myGainsJournal.services.JournalEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/journal")
public class JournalEntryController {
    @Autowired
    private JournalEntryService journalEntryService;

    @GetMapping("/user/{userId}")
    public List<JournalEntryDto> getJournalEntriesByUser(@PathVariable Long userId) {
        return journalEntryService.getAllEntriesByUserId(userId);
    }

    @PostMapping("/user/{userId}")
    public void addEntry(@RequestBody JournalEntryDto journalEntryDto, @PathVariable Long userId) {
        journalEntryService.addEntry(journalEntryDto, userId);
    }

    @DeleteMapping("/{entryId}")
    public void deleteEntryById(@PathVariable Long entryId) {
        journalEntryService.deleteEntryById(entryId);
    }

    @PutMapping
    public void updateEntry(@RequestBody JournalEntryDto journalEntryDto) {
        journalEntryService.updateEntryById(journalEntryDto);
    }

    @GetMapping("/{entryId}")
    public Optional<JournalEntryDto> getJournalEntryById(@PathVariable Long entryId) {
        return journalEntryService.getEntryById(entryId);
    }
}
