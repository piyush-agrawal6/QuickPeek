import Foundation

// Standalone macOS smoke tests, avoiding a production test-target scaffold before Gate 01.
@main
struct ProbeSmokeTests {
    static func main() throws {
        let manager = FileManager.default
        let root = manager.temporaryDirectory.appendingPathComponent(UUID().uuidString, isDirectory: true)
        try manager.createDirectory(at: root, withIntermediateDirectories: false)
        defer { try? manager.removeItem(at: root) }
        let regular = root.appendingPathComponent("fixture.json")
        let contents = Data("{\"synthetic\":true,\"message\":\"private-canary-not-for-output\"}".utf8)
        try contents.write(to: regular)
        let first = FileProbe.inspect(regular)
        precondition(first.byteCount == contents.count)
        precondition(first.accessDescription == "Read access OK (32 bytes tested)")
        precondition(!first.accessDescription.contains("canary"))
        let after = try Data(contentsOf: regular)
        precondition(after == contents)

        let empty = root.appendingPathComponent("empty.json")
        try Data().write(to: empty)
        precondition(FileProbe.inspect(empty).accessDescription == "Read access OK (0 bytes tested)")
        precondition(FileProbe.inspect(root).accessDescription == "Skipped: not a regular file")
        let link = root.appendingPathComponent("link.json")
        try manager.createSymbolicLink(at: link, withDestinationURL: regular)
        precondition(FileProbe.inspect(link).accessDescription == "Skipped: not a regular file")
        precondition(FileProbe.inspect(root.appendingPathComponent("missing.json")).accessDescription == "Metadata or read access failed")

        let large = root.appendingPathComponent("large.log")
        _ = manager.createFile(atPath: large.path, contents: nil)
        let writer = try FileHandle(forWritingTo: large)
        try writer.truncate(atOffset: 64 * 1024 * 1024)
        try writer.close()
        let largeResult = FileProbe.inspect(large)
        precondition(largeResult.byteCount == 64 * 1024 * 1024)
        precondition(largeResult.accessDescription == "Read access OK (32 bytes tested)")
        let entries = try manager.contentsOfDirectory(atPath: root.path)
        precondition(entries.count == 4)
        print("PASS: bounded reads, metadata, empty/large/missing/directory/symlink handling and source integrity")
    }
}
