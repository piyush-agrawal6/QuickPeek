import Foundation
import UniformTypeIdentifiers

// Run only against generated synthetic fixtures; output is intended for QA evidence.
guard CommandLine.arguments.count == 2 else {
    fputs("Usage: swift scripts/probe-types.swift Tests/Fixtures/Generated\n", stderr)
    exit(2)
}
let root = URL(fileURLWithPath: CommandLine.arguments[1], isDirectory: true)
let files = try FileManager.default.contentsOfDirectory(at: root,
    includingPropertiesForKeys: [.contentTypeKey, .isRegularFileKey], options: [])
print("fixture\tresolvedType\textensionType")
for file in files.sorted(by: { $0.lastPathComponent < $1.lastPathComponent }) {
    let values = try file.resourceValues(forKeys: [.contentTypeKey, .isRegularFileKey])
    guard values.isRegularFile == true else { continue }
    let inferred = UTType(filenameExtension: file.pathExtension)?.identifier ?? "unknown"
    print("\(file.lastPathComponent)\t\(values.contentType?.identifier ?? "unknown")\t\(inferred)")
}
