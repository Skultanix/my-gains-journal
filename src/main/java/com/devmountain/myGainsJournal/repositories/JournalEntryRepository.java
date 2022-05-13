package com.devmountain.myGainsJournal.repositories;

import com.devmountain.myGainsJournal.entities.JournalEntry;
import com.devmountain.myGainsJournal.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JournalEntryRepository extends JpaRepository<JournalEntry, Long> {
    List<JournalEntry> findAllByUserEquals(User user);
}
