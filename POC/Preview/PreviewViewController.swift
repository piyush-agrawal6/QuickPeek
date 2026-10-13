import AppKit
import Quartz

@MainActor
final class PreviewViewController: NSViewController, @MainActor QLPreviewingController {
    private let label = NSTextField(wrappingLabelWithString: "Preparing routing probe…")

    override func loadView() {
        view = NSView(frame: NSRect(x: 0, y: 0, width: 600, height: 320))
        label.font = .monospacedSystemFont(ofSize: 16, weight: .regular)
        label.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(label)
        NSLayoutConstraint.activate([
            label.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 28),
            label.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -28),
            label.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }

    func preparePreviewOfFile(at url: URL, completionHandler handler: @escaping (Error?) -> Void) {
        Task { @MainActor in
            let result = await Task.detached(priority: .userInitiated) {
                FileProbe.inspect(url)
            }.value
            _ = view
            label.stringValue = """
            PEEK PREVIEW PROBE

            Type: \(result.typeIdentifier)
            Size: \(result.byteCount) bytes
            \(result.accessDescription)

            No file contents displayed.
            """
            handler(nil)
        }
    }
}
