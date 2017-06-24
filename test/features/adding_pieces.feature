Feature: Adding pieces

Scenario: Adding a single piece to learned repertoire
        Given a repertoire with 0 pieces
        When 1 pieces are added
        Then there are 1 pieces in the repertoire

Scenario: Adding two pieces to learned repertoire
        Given a repertoire with 3 pieces
        When 2 pieces are added
        Then there are 5 pieces in the repertoire
